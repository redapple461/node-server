"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
exports.Details = (props) => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("h1", null,
            props.name,
            " details"),
        react_1.default.createElement("strong", null,
            " id: ",
            props.id,
            " "),
        react_1.default.createElement("br", null),
        react_1.default.createElement("strong", null,
            " Name: ",
            props.name,
            " "),
        react_1.default.createElement("br", null),
        react_1.default.createElement("strong", null,
            " Universe: ",
            props.universe,
            " "),
        react_1.default.createElement("br", null),
        react_1.default.createElement("strong", null,
            " Skills : ",
            react_1.default.createElement("ul", { style: { color: 'red' } }, props.skills.map(skill => { return (react_1.default.createElement("div", { key: 'a' },
                " ",
                skill,
                " ")); })))));
};
//# sourceMappingURL=detailPage.js.map