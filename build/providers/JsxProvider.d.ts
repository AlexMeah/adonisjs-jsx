/// <reference types="@adonisjs/application/build/adonis-typings" />
import type { ApplicationContract } from '@ioc:Adonis/Core/Application';
export default class JsxProvider {
    protected app: ApplicationContract;
    constructor(app: ApplicationContract);
    /**
     * Register view binding
     */
    register(): void;
    /**
     * Setup view on boot
     */
    boot(): void;
}
