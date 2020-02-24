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
const schema_1 = require("../models/schema");
class SkillController {
    constructor() {
        this.router = express.Router();
        this.getAllSkills = (req, res) => {
            schema_1.skillsModel.find({}, (err, data) => {
                res.send(data);
            });
        };
        this.addSkill = (req, res) => {
            schema_1.skillsModel.create({ skill: req.body.skill }, (err, data) => {
                res.send(data);
            });
        };
        this.getSkill = (req, res) => {
            schema_1.skillsModel.findOne({ skill: req.params.name }, (err, data) => {
                res.send(data);
            });
        };
        this.deleteSkill = (req, res) => {
            schema_1.skillsModel.deleteOne(req.params.name, (err, data) => {
                res.send({ msg: `Deleted ${req.params.name}` });
            });
        };
        this.updateSKill = (req, res) => {
            const query = req.body;
            schema_1.skillsModel.updateOne({ skill: req.params.oldName }, query, (err, data) => {
                res.send({ msg: `Updated ${req.params.oldName}` });
            });
        };
        this.initRoutes();
    }
    initRoutes() {
        this.router.get('/getSkills', this.getAllSkills);
        this.router.post('/addSkill', this.addSkill);
        this.router.get('/getSkill/:name', this.getSkill);
        this.router.delete('/deleteSkill/:name', this.deleteSkill);
        this.router.put('/updateSkill/:oldName', this.updateSKill);
    }
}
exports.default = SkillController;
//# sourceMappingURL=skill.routes.js.map