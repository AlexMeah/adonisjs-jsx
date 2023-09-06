/// <reference path="../adonis-typings/index.d.ts" />
/// <reference types="@adonisjs/http-server/build/adonis-typings/context" />
export declare function useHttpContext(): import("@ioc:Adonis/Core/HttpContext").HttpContextContract | null;
export declare function useSharedData<T>(): T;
export declare function useData<T>(): T;
