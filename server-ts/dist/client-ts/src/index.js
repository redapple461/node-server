"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
require("./index.css");
const App_1 = __importDefault(require("./App"));
const reducers_1 = __importDefault(require("./reducers"));
const react_redux_1 = require("react-redux");
const redux_1 = require("redux");
const store = redux_1.createStore(reducers_1.default, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
react_dom_1.default.render((react_1.default.createElement(react_redux_1.Provider, { store: store },
    react_1.default.createElement(App_1.default, null))), document.getElementById('root'));
//# sourceMappingURL=index.js.map