"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const button_1 = require("../components/button");
exports.DashboardItem = (props) => {
    return (react_1.default.createElement("div", { className: 'dashboard', key: props.hero.id },
        react_1.default.createElement(react_router_dom_1.Link, { to: '/detailHero/' + props.hero.name },
            react_1.default.createElement(button_1.Button, { className: props.className, text: props.hero.name }))));
};
//# sourceMappingURL=dashboardItem.js.map