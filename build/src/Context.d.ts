import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
declare const GlobalContext: import("react").Context<{
    ctx: HttpContextContract | null;
    props: any | null;
    shared: Record<string, any>;
}>;
export default GlobalContext;
