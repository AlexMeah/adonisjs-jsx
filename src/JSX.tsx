import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { renderToPipeableStream } from 'react-dom/server'
import Context from './Context'
import stream from 'stream'

export default class JSX {
  #shared: Record<string, any> = {}
  #context: HttpContextContract | null = null

  public context({ context }: { context: HttpContextContract }) {
    this.#context = context

    return this
  }

  public share(key: string, data: any) {
    this.#shared[key] = data
  }

  public async render(component: () => JSX.Element, props?: Record<any, any>) {
    let didError = false;
    const ctx = this.#context;

    if (!ctx) throw new Error('Must provide HTTP ctx');

    return new Promise(async (resolve, reject) => {
      const Component = component
      const sharedValuesPrepared = {}

      for (const key in this.#shared) {
        sharedValuesPrepared[key] = await this.#shared[key]()
      }

      const { pipe } = renderToPipeableStream(
        <Context.Provider value={{ ctx: this.#context, shared: sharedValuesPrepared, props }}>
          <Component {...props} />
        </Context.Provider>, {
        onAllReady() {
          // Cleaner way to pipe this?
          let data = '';
          const writable = new stream.Writable({
            write: function (chunk, _, next) {
              data += chunk.toString();
              next();
            }
          });

          ctx.response.status(didError ? 500 : 200);
          ctx.response.header('content-type', 'text/html');

          pipe(writable);

          writable.on('finish', () => {
            resolve(data);
          });
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          didError = true;
          console.error(error);
        },
      }
      )
    })
  }
}
