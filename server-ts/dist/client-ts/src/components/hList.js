"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const button_1 = require("./button");
const actions = __importStar(require("../actions"));
const httpHook_1 = require("../http/httpHook");
exports.HeroesList = (props) => {
    return (react_1.default.createElement("ul", null, props.heroes.filter(hero => {
        return hero.universe.toLowerCase().indexOf(props.universe.toLowerCase()) !== -1;
    }).map((hero) => {
        return (react_1.default.createElement("div", { key: hero.id },
            react_1.default.createElement(react_router_dom_1.Link, { to: '/detailHero/' + hero.name },
                react_1.default.createElement(button_1.Button, { className: 'waves-effect orange darken-1 btn list_btn', text: hero.id + ': ' + hero.name })),
            react_1.default.createElement(button_1.Button, { text: 'x', className: 'waves-effect red btn', onClick: () => httpHook_1.deleteByName(hero.name).then(() => { props.dispatch(actions.deleteHero(hero.id)); /*window.M.toast({html: "Hero "+hero.name+" was delete"})*/ }) })));
    })));
};
//# sourceMappingURL=hList.js.map