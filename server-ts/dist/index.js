"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const app_routes_1 = __importDefault(require("./routes/app.routes"));
const app = new app_1.default(4000, new app_routes_1.default());
app.listen();
exports.default = app;
//# sourceMappingURL=index.js.map