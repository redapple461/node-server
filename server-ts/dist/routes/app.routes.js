"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const schema_1 = __importDefault(require("../models/schema"));
class HeroController {
    constructor() {
        this.router = express_1.Router();
        this.model = schema_1.default;
        this.getAllHeroes = (req, res) => {
            return this.model.find({}, (err, data) => {
                res.send(data);
            });
        };
        this.addHero = (req, res) => {
            if (req.body.name === undefined)
                return res.status(400).send({ error: 'name is undefined' });
            const hero = req.body;
            if (hero.universe === undefined)
                hero.universe = "";
            console.log('hero to post: ' + hero);
            this.model.countDocuments({}, (err, c) => {
                console.log("Count is : " + c);
                hero.id = c + 1;
                // check if hero already exists response with message
                this.model.exists({ name: hero.name }, (searchErr, searchRes) => {
                    // if(searchErr) console.log(err)
                    if (!searchRes) {
                        this.model.create(hero, (_err, _res) => {
                            return res.status(200).send(hero);
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
                // if(err) res.send(err)
                res.send(data);
            });
        };
        this.updateHero = (req, res) => {
            if (req.body.name === undefined)
                return res.status(400).send({ error: "Name is undefined" });
            const oldName = req.params.oldName;
            const hero = req.body;
            console.log(`Old name ${oldName} will update with values ${hero.name}: ${hero.universe}`);
            const query = { $set: hero };
            this.model.updateOne({ name: oldName }, query, (err) => {
                // if(err) return res.send(err)
                res.send({ message: `Hero ${oldName} was update - ${hero.name}: ${hero.universe}` });
            });
        };
        this.deleteHero = (req, res) => {
            const deleteName = req.params.name;
            console.log(`Hero to delete ${deleteName}`);
            this.model.deleteOne({ name: deleteName }, (err) => {
                // if(err) res.send(err)
                res.send({ message: `Hero ${deleteName} was deleted` });
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