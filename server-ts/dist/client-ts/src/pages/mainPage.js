"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
require("./css/mainPage.css");
const react_redux_1 = require("react-redux");
const actions = __importStar(require("../actions"));
const button_1 = require("../components/button");
const radio_1 = require("../components/radio");
const dashboard_1 = require("../components/dashboard");
const emptyHeroes_1 = require("../components/emptyHeroes");
const httpHook_1 = require("../http/httpHook");
exports.MainPage = () => {
    const universe = react_redux_1.useSelector((state) => state.searchUniverse);
    const heroes = react_redux_1.useSelector((state) => state.heroes.slice(state.heroes.length - 4, state.heroes.length).reverse());
    const dispatch = react_redux_1.useDispatch();
    const isUnLoad = react_redux_1.useSelector((state) => state.noHeroes);
    const isLoad = react_redux_1.useSelector((state) => state.isLoad);
    function fetchData() {
        return __awaiter(this, void 0, void 0, function* () {
            return httpHook_1.getHeroes()
                .then(res => {
                res.sort((a, b) => a.id - b.id);
                dispatch(actions.getData(res));
            });
        });
    }
    react_1.useEffect(() => {
        if (isLoad) {
            dispatch(actions.clearDetailHero());
        }
        if (isUnLoad) {
            fetchData();
            dispatch(actions.loadComplete());
        }
    });
    const dashboard = heroes.length ? react_1.default.createElement(dashboard_1.Dashboard, { heroes: heroes }) : react_1.default.createElement(emptyHeroes_1.EmptyHeroes, null);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", null,
            react_1.default.createElement("h1", null, " Tours of heroes")),
        react_1.default.createElement("div", null,
            react_1.default.createElement(react_router_dom_1.Link, { to: { pathname: '/heroes' } },
                react_1.default.createElement(button_1.Button, { className: 'waves-effect waves-light btn', text: 'Heroes' })),
            react_1.default.createElement("div", null,
                react_1.default.createElement(radio_1.RadioButton, { className: 'with-gap', value: 'Marvel', checked: universe === 'Marvel', text: 'Marvel', dispatch: () => dispatch(actions.setMarvel()) }),
                react_1.default.createElement(radio_1.RadioButton, { className: 'with-gap', value: 'DC', checked: universe === 'DC', text: 'DC', dispatch: () => dispatch(actions.setDC()) }),
                react_1.default.createElement(radio_1.RadioButton, { className: 'with-gap', value: '', checked: universe === '', text: 'Both', dispatch: () => dispatch(actions.setBoth()) }))),
        dashboard));
};
//# sourceMappingURL=mainPage.js.map