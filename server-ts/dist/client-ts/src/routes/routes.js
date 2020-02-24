"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const mainPage_1 = require("../pages/mainPage");
const heroList_1 = __importDefault(require("../pages/heroList"));
const notFound_1 = require("../pages/notFound");
const heroDetailPage_1 = require("../pages/heroDetailPage");
exports.useRoutes = () => {
    return (react_1.default.createElement(react_router_dom_1.Switch, null,
        react_1.default.createElement(react_router_dom_1.Route, { path: '/main', component: mainPage_1.MainPage }),
        react_1.default.createElement(react_router_dom_1.Route, { path: '/heroes', component: heroList_1.default }),
        react_1.default.createElement(react_router_dom_1.Route, { path: '/notFound' },
            react_1.default.createElement(notFound_1.NotFound, null)),
        react_1.default.createElement(react_router_dom_1.Route, { path: '/detailHero/:name', component: heroDetailPage_1.HeroDetailPage }),
        react_1.default.createElement(react_router_dom_1.Route, { path: '/' },
            react_1.default.createElement(react_router_dom_1.Redirect, { to: '/main' })),
        react_1.default.createElement(react_router_dom_1.Redirect, { to: '/notFound' })));
};
//# sourceMappingURL=routes.js.map