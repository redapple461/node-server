import * as express from 'express';
import mongo, { Schema } from 'mongoose';
import { HeroInterface } from '../models/hero.model';
import { universeModel, heroModel, skillsModel } from '../models/schema';
import { UniverseInterface } from '../models/universe.model';
import { SkillInterface } from '../models/skill.model';


class HeroController {
    public router: express.Router = express.Router();
    private model: Schema = heroModel;

    constructor () {
        this.initRoutes();
    }

    public initRoutes () {
        this.router.get('/getHeroes', this.getAllHeroes);
        this.router.post('/addHero', this.addHero);
        this.router.get('/getHero/:name', this.getHero);
        this.router.delete('/deleteHero/:name', this.deleteHero);
        this.router.put('/updateHero/:oldName', this.updateHero);
    }

    private getAllHeroes = (req: express.Request, res: express.Response) => {
            return this.model.find({}, (err: Error, data: HeroInterface[]) => {
                const _heroes = [];
                for (const hero of data) {
                  universeModel.findOne({_id: hero.universe}, (err: Error, universeData: UniverseInterface) => {
                    skillsModel.findOne({hero_id: hero._id}, (err, skillData: SkillInterface) => {
                      const pushHero = {id: hero.id, name: hero.name, universe: universeData.universe, skills: skillData.skills } ;
                      _heroes.push(pushHero);
                      if (_heroes.length === data.length) {
                        res.send(_heroes);
                      }
                    });
                  });
                }
            });
        }

    private addHero = (req: express.Request, res: express.Response) => {
        console.log(req.body)
        if (req.body.name === undefined) {
            return res.status(400).send({error: 'name is undefined'});
        }
        const hero: HeroInterface = req.body;
        if (hero.universe === undefined) {
            hero.universe = '';
        }
        console.log('hero to post: ' + hero);
        this.model.countDocuments({}, (err: Error, c: number) => {
            console.log('Count is : ' + c);
            hero.id = c + 1;
            // check if hero already exists response with message
            this.model.exists({name: hero.name}, (searchErr: any, searchRes: boolean) => {
                // if(searchErr) console.log(err)
                if (!searchRes) {
                    universeModel.findOne({universe: hero.universe}, (error: Error, searchId: UniverseInterface) => {
						const heroSkills = req.body.skills;
						const heroId = new mongo.Types.ObjectId();
						const skillsId = new mongo.Types.ObjectId();
						skillsModel.create({_id: skillsId, hero_id: heroId, skills: heroSkills},(err,std)=>{
							this.model.create({_id: heroId, id: hero.id, name: hero.name, universe: searchId._id, skills: skillsId },(er,re) => {
								return res.send(hero);
							});
						});
                    });
                } else {
                    res.send({message: `Hero with name ${hero.name} already exists`});
                }
            });
        });
    }

    private getHero = (req: express.Request, res: express.Response) => {
        const searchName: string  = req.params.name;
        console.log(`Get hero ${searchName}`);
        this.model.findOne({name: searchName}, (err: any, data: HeroInterface) => {
            universeModel.findOne({_id: data.universe},(err: Error, universeData: UniverseInterface) => {
              skillsModel.findOne({hero_id: data._id},(err: Error, skillData: SkillInterface) => {
				res.send({id: data.id, name: data.name, universe: universeData.universe, skills: skillData.skills});
			  });
            });
        });
    }

    private updateHero = (req: express.Request, res: express.Response) => {
        if (req.body.name === undefined) {
            return res.status(400).send({error: 'Name is undefined'});
        }
        const oldName: string = req.params.oldName;
        const hero: HeroInterface = req.body;
        console.log(`Old name ${oldName} will update with values ${hero.name}: ${hero.universe}`);
        this.model.findOne({name: oldName}, (err,some)=>{
			universeModel.findOne({universe: hero.universe}, (err: Error, _res: UniverseInterface) => {
				skillsModel.findOne({hero_id: some._id}, (err: Error, skillsData: SkillInterface) => {
				  skillsModel.updateOne({_id: skillsData._id},{$set:{skills: req.body.skills}},(err,otv) => {
					const qHero = {name: hero.name, universe: _res._id, skills: skillsData._id};
					const query = {$set: qHero};
					this.model.updateOne({name: oldName}, query, () => {
					  // if (err) {return res.send(err); }
					  res.send({message: `Hero ${oldName} was update - ${hero.name}: ${hero.universe}`});
				   });
				  })
				});
			  });
		})
    }

    private deleteHero = (req: express.Request, res: express.Response) => {
        const deleteName: string = req.params.name;
        console.log(`Hero to delete ${deleteName}`);
        this.model.findOne({name: deleteName}, (err: Error, data: HeroInterface) => {
			this.model.deleteOne({_id: data._id},(err) => {
				skillsModel.deleteOne({hero_id: data._id}, err => {
					res.send({message: `Hero ${deleteName} was deleted`});
				});
			});
        });
    }
}

export default HeroController;
