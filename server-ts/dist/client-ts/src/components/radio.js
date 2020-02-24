"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
exports.RadioButton = (props) => {
    return (react_1.default.createElement("label", null,
        react_1.default.createElement("input", { id: props.id, className: props.className, name: props.name, type: props.type || 'radio', value: props.value, checked: props.checked, onChange: props.dispatch }),
        react_1.default.createElement("span", null, props.text)));
};
//# sourceMappingURL=radio.js.map