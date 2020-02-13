"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
class App {
    constructor(controllers) {
        this.app = express_1.default();
        this.port = config_1.default.get('port');
        this.initMidleware();
        this.initControllers(controllers);
    }
    initMidleware() {
        this.app.use(cors_1.default());
        this.app.use(body_parser_1.default());
        this.app.use(body_parser_1.default.json({ limit: '5mb' }));
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(body_parser_1.default.json());
    }
    initControllers(controllers) {
        this.app.use('', controllers.router);
    }
    getServer() {
        return this.app;
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map