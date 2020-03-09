import * as express from 'express';
import mongo, { Schema } from 'mongoose';
import { HeroInterface } from '../models/hero.model';
import { universeModel, heroModel, skillsModel } from '../models/schema';
import { UniverseInterface } from '../models/universe.model';
import { SkillInterface } from '../models/skill.model';
import {auth} from '../midleware/auth.midleware';
import UniverseController from './universe.routes';
import SkillController from './skill.routes';
import { heroValid } from '../midleware/heroValidate.midleware';



// tslint:disable: align
class HeroController {
    public router: express.Router = express.Router();
    private model: Schema = heroModel;

    constructor (public universeController: UniverseController, public skillController: SkillController) {
        this.initRoutes();
    }

    public initRoutes () {
        this.router.get('/getHeroes', auth, this.sendHeroes);
        this.router.post('/addHero', auth, heroValid, this.universeController.findUniverseByName, this.skillController.addSkill, this.addHero);
        this.router.get('/getHero/:name', auth, this.getHero , this.universeController.findUniverseById, this.skillController.getSkillById, this.sendHero);
        this.router.delete('/deleteHero/:name', auth, this.deleteHero, this.skillController.deleteSkill);
		this.router.put('/updateHero/:oldName', auth, this.getHero, this.skillController.getSkillById, this.skillController.updateSkillsArray,
														 this.universeController.findUniverseByName, this.updateHero);
    }


	public async getAllHeroes (callback) {
		return this.model.find({}, (err: Error, data: HeroInterface[]) => {
			if (err) {
				console.log(err);
			}
			const _heroes = [];
			for (const hero of data) {
			  universeModel.findOne({_id: hero.universe}, (err: Error, universeData: UniverseInterface) => {
				skillsModel.findOne({hero_id: hero._id}, (err, skillData: SkillInterface) => {
				  const pushHero = {id: hero.id, name: hero.name, universe: universeData.universe, skills: skillData.skills } ;
				  _heroes.push(pushHero);
				  if (_heroes.length === data.length) {
					callback(_heroes);
				  }
				});
			  });
			}
		});
	}
    private sendHeroes = (req: express.Request, res: express.Response) => {
		this.getAllHeroes((data) => {
			res.send(data);
		});
	}

    private addHero = (req: express.Request, res: express.Response) => {
        const hero: HeroInterface = req.body;
        console.log('hero to post: ' + hero);
        this.model.countDocuments({}, (err: Error, c: number) => {
            console.log('Count is : ' + c);
            hero.id = c + 1;
            // check if hero already exists response with message
            this.model.exists({name: hero.name}, (searchErr: any, searchRes: boolean) => {
                // if(searchErr) console.log(err)
                if (!searchRes) {
                  this.model.create({_id: req.body.heroId, id: hero.id, name: hero.name, universe: req.body.universeId, skills: req.body.skillId}, (err, data) => {
						if (err) {console.log(err);}
						res.send(hero);
				  });
                } else {
                  res.send({message: `Hero with name ${hero.name} already exists`});
                }
              });
          });
    }

    private getHero = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const searchName: string  = req.params.name ? req.params.name : req.params.oldName;
        console.log(`Get hero ${searchName}`);
        this.model.findOne({name: searchName}, (err: any, data: HeroInterface) => {
			console.log(searchName);
			req.body.hero = data;
			next();
        });
	}



	// tslint:disable-next-line: align
	private sendHero = (req: express.Request, res: express.Response) => {
		/*
			req.body.skills - skill data
			req.body.universe - universe data
			req.body.hero - hero data (with ids of skill and universe);
		*/
		const hero = req.body.hero;
		const skills = req.body.skillsData.skills;
		const universe = req.body.universe.universe;
		const heroToSend = {id: hero.id, name: hero.name, universe, skills};
		res.send(heroToSend);
	}

    private updateHero = (req: express.Request, res: express.Response) => {
        if (req.body.name === undefined) {
            return res.status(400).send({error: 'Name is undefined'});
        }
        const oldName: string = req.params.oldName;
        const hero: HeroInterface = {id: req.body.id, name: req.body.name, universe: req.body.universeId, skills: req.body.hero.skills};
        this.model.updateOne({_id: req.body.hero._id}, hero, (err,data) => {
			if (err) {
				console.log(err);
				res.status(400).send({message: 'Some error while update hero', erro: err.message});
			}
			res.send({message: `Hero ${oldName} was updated to ${hero.name}`});
		})
    }

    private deleteHero = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const deleteName: string = req.params.name;
        console.log(`Hero to delete ${deleteName}`);
        this.model.findOne({name: deleteName}, (err: Error, data: HeroInterface) => {
			if (data === null) { return console.log('no data for delete ' + req.params.name); }
			console.log(data);
			this.model.deleteOne({_id: data._id}, (err) => {
				req.body.skillId = data._id;
				next();
			});
        });
    }
}

export default HeroController;
