"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./App.css");
const routes_1 = require("./routes/routes");
const react_router_dom_1 = require("react-router-dom");
require("materialize-css");
function App() {
    const routes = routes_1.useRoutes();
    return (react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
        react_1.default.createElement("div", null, routes)));
}
exports.default = App;
//# sourceMappingURL=App.js.map