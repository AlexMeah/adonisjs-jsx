declare module '@ioc:Adonis/Addons/JSX' {
    import type { Context as ContextType } from 'react';
    import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
    interface JsxRendererContract {
        context: ({ context }: {
            context: HttpContextContract;
        }) => void;
        share: (key: string, data: any) => void;
        render: (element: () => JSX.Element, props?: Record<any, any>) => void;
    }
    const JSX: JsxRendererContract;
    const Context: ContextType<{
        ctx: HttpContextContract | null;
        props: any | null;
        shared: Record<string, any>;
    }>;
    const useData: <T>() => T;
    const useSharedData: <T>() => T;
    const useHttpContext: () => HttpContextContract | null;
}
declare module '@ioc:Adonis/Core/HttpContext' {
    import { JsxRendererContract } from '@ioc:Adonis/Addons/JSX';
    interface HttpContextContract {
        jsx: JsxRendererContract;
    }
}
