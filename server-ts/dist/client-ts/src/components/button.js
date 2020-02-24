"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
exports.Button = (props) => {
    return (react_1.default.createElement("button", { id: props.id, className: props.className, onClick: props.onClick },
        " ",
        props.text,
        " "));
};
//# sourceMappingURL=button.js.map