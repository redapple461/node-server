"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("config"));
const Schema = mongoose_1.default.Schema;
const { host, port, name } = config_1.default.get('mongoDB');
const connectUrl = `mongodb://${host}:${port}/${name}`;
const hero = new Schema({
    id: { type: Number },
    name: { type: String, unique: true },
    universe: { type: String }
});
const db = mongoose_1.default.connect(connectUrl, (err, res) => {
    console.log('Connect to ' + db, ' + ', res);
});
exports.default = mongoose_1.default.model('heroes', hero, 'heroes');
//# sourceMappingURL=schema.js.map