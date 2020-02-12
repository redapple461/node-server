"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const app_routes_1 = __importDefault(require("./routes/app.routes"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = express_1.default();
const port = config_1.default.get('port');
app.use(cors_1.default());
app.use(body_parser_1.default());
app.use(body_parser_1.default.json({ limit: '5mb' }));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(app_routes_1.default);
app.listen(port, (err) => {
    return console.log(`server is listening on ${port}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map