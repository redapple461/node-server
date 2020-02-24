"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const button_1 = require("./button");
const react_router_dom_1 = require("react-router-dom");
exports.NoPage = (props) => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("h1", null,
            "Didnt find hero with name : ",
            react_1.default.createElement("span", { className: 'error' }, props.name)),
        react_1.default.createElement(react_router_dom_1.Link, { to: { pathname: '/main' } },
            react_1.default.createElement(button_1.Button, { text: 'Go to main', className: 'waves-effect waves-light btn', type: 'button' }))));
};
//# sourceMappingURL=404.js.map