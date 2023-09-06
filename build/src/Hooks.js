"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useData = exports.useSharedData = exports.useHttpContext = void 0;
const react_1 = require("react");
const Context_1 = __importDefault(require("./Context"));
function useHttpContext() {
    const { ctx } = (0, react_1.useContext)(Context_1.default);
    return ctx;
}
exports.useHttpContext = useHttpContext;
function useSharedData() {
    const { shared } = (0, react_1.useContext)(Context_1.default);
    return shared;
}
exports.useSharedData = useSharedData;
function useData() {
    const { props } = (0, react_1.useContext)(Context_1.default);
    return props;
}
exports.useData = useData;
