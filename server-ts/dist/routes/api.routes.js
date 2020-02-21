"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
class API {
    // tslint:disable-next-line: align
    constructor() {
        this.router = express.Router();
        // tslint:disable-next-line: align
        this.sendClient = (req, res) => {
            res.send(this.renderFullPage());
        };
        this.renderFullPage = () => {
            return `
		<!doctype html>
		<html>
		  <head>
			<title>Redux Universal Example</title>
		  </head>
		  <body>
			<div id="root">${this.html}</div>

			<script src="bundle.js"></script>
		  </body>
		</html>
		`;
        };
        this.initRoutes();
        this.html = 'Hello from api';
    }
    // tslint:disable-next-line: align
    initRoutes() {
        this.router.get('/', this.sendClient);
    }
}
exports.default = API;
//# sourceMappingURL=api.routes.js.map