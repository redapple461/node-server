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
const mongoose_1 = __importDefault(require("mongoose"));
const schema_1 = require("../models/schema");
class HeroController {
    constructor() {
        this.router = express.Router();
        this.model = schema_1.heroModel;
        this.getAllHeroes = (req, res) => {
            return this.model.find({}, (err, data) => {
                const _heroes = [];
                for (const hero of data) {
                    schema_1.universeModel.findOne({ _id: hero.universe }, (err, universeData) => {
                        schema_1.skillsModel.findOne({ hero_id: hero._id }, (err, skillData) => {
                            const pushHero = { id: hero.id, name: hero.name, universe: universeData.universe, skills: skillData.skills };
                            _heroes.push(pushHero);
                            if (_heroes.length === data.length) {
                                res.send(_heroes);
                            }
                        });
                    });
                }
            });
        };
        this.addHero = (req, res) => {
            console.log(req.body);
            if (req.body.name === undefined) {
                return res.status(400).send({ error: 'name is undefined' });
            }
            const hero = req.body;
            if (hero.universe === undefined) {
                hero.universe = '';
            }
            console.log('hero to post: ' + hero);
            this.model.countDocuments({}, (err, c) => {
                console.log('Count is : ' + c);
                hero.id = c + 1;
                // check if hero already exists response with message
                this.model.exists({ name: hero.name }, (searchErr, searchRes) => {
                    // if(searchErr) console.log(err)
                    if (!searchRes) {
                        schema_1.universeModel.findOne({ universe: hero.universe }, (error, searchId) => {
                            const heroSkills = req.body.skills;
                            const heroId = new mongoose_1.default.Types.ObjectId();
                            const skillsId = new mongoose_1.default.Types.ObjectId();
                            schema_1.skillsModel.create({ _id: skillsId, hero_id: heroId, skills: heroSkills }, (err, std) => {
                                this.model.create({ _id: heroId, id: hero.id, name: hero.name, universe: searchId._id, skills: skillsId }, (er, re) => {
                                    return res.send(hero);
                                });
                            });
                        });
                    }
                    else {
                        res.send({ message: `Hero with name ${hero.name} already exists` });
                    }
                });
            });
        };
        this.getHero = (req, res) => {
            const searchName = req.params.name;
            console.log(`Get hero ${searchName}`);
            this.model.findOne({ name: searchName }, (err, data) => {
                schema_1.universeModel.findOne({ _id: data.universe }, (err, universeData) => {
                    schema_1.skillsModel.findOne({ hero_id: data._id }, (err, skillData) => {
                        res.send({ id: data.id, name: data.name, universe: universeData.universe, skills: skillData.skills });
                    });
                });
            });
        };
        this.updateHero = (req, res) => {
            if (req.body.name === undefined) {
                return res.status(400).send({ error: 'Name is undefined' });
            }
            const oldName = req.params.oldName;
            const hero = req.body;
            console.log(`Old name ${oldName} will update with values ${hero.name}: ${hero.universe}`);
            this.model.findOne({ name: oldName }, (err, some) => {
                schema_1.universeModel.findOne({ universe: hero.universe }, (err, _res) => {
                    schema_1.skillsModel.findOne({ hero_id: some._id }, (err, skillsData) => {
                        schema_1.skillsModel.updateOne({ _id: skillsData._id }, { $set: { skills: req.body.skills } }, (err, otv) => {
                            const qHero = { name: hero.name, universe: _res._id, skills: skillsData._id };
                            const query = { $set: qHero };
                            this.model.updateOne({ name: oldName }, query, () => {
                                // if (err) {return res.send(err); }
                                res.send({ message: `Hero ${oldName} was update - ${hero.name}: ${hero.universe}` });
                            });
                        });
                    });
                });
            });
        };
        this.deleteHero = (req, res) => {
            const deleteName = req.params.name;
            console.log(`Hero to delete ${deleteName}`);
            this.model.findOne({ name: deleteName }, (err, data) => {
                this.model.deleteOne({ _id: data._id }, (err) => {
                    schema_1.skillsModel.deleteOne({ hero_id: data._id }, err => {
                        res.send({ message: `Hero ${deleteName} was deleted` });
                    });
                });
            });
        };
        this.initRoutes();
    }
    initRoutes() {
        this.router.get('/getHeroes', this.getAllHeroes);
        this.router.post('/addHero', this.addHero);
        this.router.get('/getHero/:name', this.getHero);
        this.router.delete('/deleteHero/:name', this.deleteHero);
        this.router.put('/updateHero/:oldName', this.updateHero);
    }
}
exports.default = HeroController;
//# sourceMappingURL=app.routes.js.map