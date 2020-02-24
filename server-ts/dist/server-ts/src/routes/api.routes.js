"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const react_1 = __importDefault(require("react"));
const server_1 = require("react-dom/server");
const App_1 = __importDefault(require("../../../client-ts/src/App"));
class API {
    // tslint:disable-next-line: align
    constructor() {
        this.router = express.Router();
        this.initRoutes();
    }
    // tslint:disable-next-line: align
    initRoutes() {
        this.router.get('^/$', (req, res) => {
            //const store = createStore(reducer);
            const html = server_1.renderToString(
            //	<Provider store = {store} >
            react_1.default.createElement(App_1.default, null)
            //	</Provider>
            );
            res.send(this.renderFullPage(html));
        });
    }
    renderFullPage(html) {
        return `
		<!doctype html>
		<html>
		<head>
			<title>Redux Universal Example</title>
		</head>
		<body>
			<div id="root">${html}</div>
			<script src="bundle.js"></script>
		</body>
		</html>
		`;
    }
}
exports.default = API;
//# sourceMappingURL=api.routes.js.map