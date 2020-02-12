"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const schema_1 = __importDefault(require("../models/schema"));
const router = express_1.Router();
router.get('/getHeroes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    schema_1.default.find({}, (err, data) => {
        res.send(data);
    });
}));
router.post('/addHero', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.name === undefined)
        return res.status(400).send({ error: 'name is undefined' });
    console.log('hero to post: ' + req.body.name + ', ' + req.body.universe);
    schema_1.default.countDocuments({}, (err, c) => {
        console.log("Count is : " + c);
        const hero = { id: c + 1, name: req.body.name, universe: req.body.universe === undefined ? "" : req.body.universe };
        // check if hero already exists response with message
        if (hero.universe === "")
            console.log(hero.name + " AAAAAAAAAAA");
        schema_1.default.exists({ name: hero.name }, (searchErr, searchRes) => {
            // if(searchErr) console.log(err)
            if (!searchRes) {
                schema_1.default.create(hero, (_err, _res) => {
                    return res.status(200).send(hero);
                });
            }
            else {
                res.send({ message: `Hero with name ${hero.name} already exists` });
            }
        });
    });
}));
router.get('/getHero/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchName = req.params.name;
    console.log(`Get hero ${searchName}`);
    schema_1.default.find({ name: searchName }, (err, data) => {
        // if(err) res.send(err)
        res.send(data);
    });
}));
router.delete('/deleteHero/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteName = req.params.name;
    console.log(`Hero to delete ${deleteName}`);
    schema_1.default.deleteOne({ name: deleteName }, (err) => {
        // if(err) res.send(err)
        res.send({ message: `Hero ${deleteName} was deleted` });
    });
}));
router.put('/updateHero/:oldName', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.name === undefined)
        return res.status(400).send({ error: "Name is undefined" });
    const oldName = req.params.oldName;
    const name = req.body.name;
    const universe = req.body.universe;
    console.log(`Old name ${oldName} will update with values ${name}: ${universe}`);
    const query = { $set: { name, universe } };
    schema_1.default.updateOne({ name: oldName }, query, (err) => {
        // if(err) return res.send(err)
        res.send({ message: `Hero ${oldName} was update - ${name}: ${universe}` });
    });
}));
exports.default = router;
//# sourceMappingURL=app.routes.js.map