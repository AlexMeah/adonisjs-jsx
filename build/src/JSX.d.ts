import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
export default class JSX {
    #private;
    context({ context }: {
        context: HttpContextContract;
    }): this;
    share(key: string, data: any): void;
    render(component: () => JSX.Element, props?: Record<any, any>): Promise<unknown>;
}
