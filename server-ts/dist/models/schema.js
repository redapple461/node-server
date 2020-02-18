"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("config"));
const ObjectId = mongoose_1.default.Types.ObjectId;
const Schema = mongoose_1.default.Schema;
const { host, port, name } = config_1.default.get('mongoDB');
const connectUrl = `mongodb://${host}:${port}/${name}`;
const hero = new Schema({
    id: { type: Number },
    name: { type: String, unique: true },
    universe: { type: ObjectId },
    skills: { type: [ObjectId] }
});
const universe = new Schema({
    universe: { type: String }
});
const skills = new Schema({
    skill: { type: String }
});
const db = mongoose_1.default.connect(connectUrl, (err, res) => {
    console.log('Connect to ' + db + res);
});
exports.universeModel = mongoose_1.default.model('universe', universe, 'universe');
exports.heroModel = mongoose_1.default.model('heroes', hero, 'heroes');
exports.skillsModel = mongoose_1.default.model('skills', skills, 'skills');
//# sourceMappingURL=schema.js.map