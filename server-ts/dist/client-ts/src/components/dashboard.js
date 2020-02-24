"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const dashboardItem_1 = require("./dashboardItem");
exports.Dashboard = (props) => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("h2", null, "Last heroes"),
        react_1.default.createElement("ul", null, props.heroes.map((hero) => {
            return react_1.default.createElement(dashboardItem_1.DashboardItem, { key: hero.id, className: 'waves-effect teal lighten-1 btn dashboard_btn', hero: hero });
        }))));
};
//# sourceMappingURL=dashboard.js.map