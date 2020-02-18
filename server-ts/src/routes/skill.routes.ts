import * as express from 'express';
import { Schema } from 'mongoose';
import { HeroInterface } from '../models/hero.model';
import { skillsModel } from '../models/schema';


class SkillController {
    public router: express.Router = express.Router();

    constructor () {
        this.initRoutes();
    }

    public initRoutes () {
        this.router.get('/getSkills', this.getAllSkills);
        this.router.post('/addSkill', this.addSkill);
        this.router.get('/getSkill/:name', this.getSkill);
        this.router.delete('/deleteSkill/:name', this.deleteSkill);
        this.router.put('/updateSkill/:oldName', this.updateSKill);
    }

    private getAllSkills = (req: express.Request, res: express.Response) => {
      skillsModel.find({}, (err,data) => {
        res.send(data);
      });
    }

    private addSkill = (req: express.Request, res: express.Response) => {
      skillsModel.create({skill: req.body.skill},(err,data) => {
        res.send(data);
      });
    }

    private getSkill = (req: express.Request, res: express.Response) => {
      skillsModel.findOne({skill: req.params.name}, (err,data) => {
        res.send(data);
      });
    }

    private deleteSkill = (req: express.Request, res: express.Response) => {
      skillsModel.deleteOne(req.params.name, (err,data) => {
        res.send({msg: `Deleted ${req.params.name}`});
      });
    }

    private updateSKill = (req: express.Request, res: express.Response) => {
      const query = req.body;
      skillsModel.updateOne({skill: req.params.oldName},query, (err,data) => {
        res.send({msg: `Updated ${req.params.oldName}`});
      });
    }
}

export default SkillController;
