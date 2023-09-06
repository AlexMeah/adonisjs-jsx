"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _JSX_shared, _JSX_context;
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const server_1 = require("react-dom/server");
const Context_1 = __importDefault(require("./Context"));
const stream_1 = __importDefault(require("stream"));
class JSX {
    constructor() {
        _JSX_shared.set(this, {});
        _JSX_context.set(this, null);
    }
    context({ context }) {
        __classPrivateFieldSet(this, _JSX_context, context, "f");
        return this;
    }
    share(key, data) {
        __classPrivateFieldGet(this, _JSX_shared, "f")[key] = data;
    }
    async render(component, props) {
        let didError = false;
        return new Promise(async (resolve, reject) => {
            const Component = component;
            const sharedValuesPrepared = {};
            for (const key in __classPrivateFieldGet(this, _JSX_shared, "f")) {
                sharedValuesPrepared[key] = await __classPrivateFieldGet(this, _JSX_shared, "f")[key]();
            }
            const { pipe } = (0, server_1.renderToPipeableStream)((0, jsx_runtime_1.jsx)(Context_1.default.Provider, { value: { ctx: __classPrivateFieldGet(this, _JSX_context, "f"), shared: sharedValuesPrepared, props }, children: (0, jsx_runtime_1.jsx)(Component, { ...props }) }), {
                onAllReady() {
                    // Cleaner way to pipe this?
                    let data = '';
                    const writable = new stream_1.default.Writable({
                        write: function (chunk, _, next) {
                            data += chunk.toString();
                            next();
                        }
                    });
                    __classPrivateFieldGet(this, _JSX_context, "f").response.implicitEnd = false;
                    __classPrivateFieldGet(this, _JSX_context, "f").response.status(didError ? 500 : 200);
                    __classPrivateFieldGet(this, _JSX_context, "f").response.header('content-type', 'text/html');
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
            });
        });
    }
}
_JSX_shared = new WeakMap(), _JSX_context = new WeakMap();
exports.default = JSX;
