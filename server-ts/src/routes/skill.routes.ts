import * as express from 'express';
import { skillsModel } from '../models/schema';
import { auth } from '../midleware/auth.midleware';
import mongo from 'mongoose';

class SkillController {
    public router: express.Router = express.Router();

    constructor () {
        this.initRoutes();
    }

    public initRoutes () {
        this.router.get('/getSkills', auth, this.getAllSkills);
        // this.router.post('/addSkill', auth, this.addSkill);
        // this.router.get('/getSkill/:name', auth, this.getSkill);
        // this.router.delete('/deleteSkill/:name', auth, this.deleteSkill);
        // this.router.put('/updateSkill/:oldName', auth, this.updateSKill);
    }

    public getAllSkills = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
		skillsModel.find({}, (data) => {
			res.send(data);
		});
	}

	// tslint:disable: align
	public deleteSkill = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
		skillsModel.deleteOne({_id: req.body.skillId}, () => {
			res.send({message: 'Deleted'});
		});
	}

	// tslint:disable: align
	public addSkill = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
		const heroId = new mongo.Types.ObjectId();
		const skillId = new mongo.Types.ObjectId();
		skillsModel.create({_id: skillId, hero_id: heroId, skills: req.body.skills}, (err, data) => {
			req.body.skillId = skillId;
			req.body.heroId = heroId;
			next();
		});
	}
	// refactor to cover 2 case -> if req.body.heroId exist  from req.pamars
	public getSkill = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
		const heroId = req.body.heroId;
		skillsModel.findOne({hero_id: heroId}, (err,data) => {
			req.body.skill = data;
			next();
		});
	}


	public getSkillById = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
		const skillId = req.body.hero.skills;
		skillsModel.findOne({_id: skillId}, (err,data) => {
			if (err) {
				res.status(400).send({message: 'Some problem with skill', error: err.message});
			}
			req.body.skillsData = data;
			next();
		});
	}

	public updateSkillsArray = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
		const newSkills = req.body.skills;
		skillsModel.updateOne({_id: req.body.hero.skills}, {$set: {skills: newSkills}} , (err, data) => {
			if (err) {
				res.status(400).send({message: 'Some erro while update skills', error: err.message});
			}
			next();
		});
	}
}

export default SkillController;
