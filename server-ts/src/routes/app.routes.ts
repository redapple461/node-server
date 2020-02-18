import * as express from 'express';
import { Schema } from 'mongoose';
import { HeroInterface } from '../models/hero.model';
import { universeModel, heroModel, skillsModel } from '../models/schema';
import { UniverseInterface } from '../models/universe.model';
import { SkillInterface } from '../models/skill.model';
import SkillController from './skill.routes';

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
                    skillsModel.find({_id: hero.skills}, (err, skillData: SkillInterface[]) => {
                      const pushHero: HeroInterface = {id: hero.id, name: hero.name, universe: universeData.universe, skills: skillData.map((obj: SkillInterface) => obj.skill) } ;
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
                      skillsModel.find({skill: hero.skills},(err: Error, skillsData: SkillInterface[]) => {
                        this.model.create({id: hero.id, name: hero.name, universe: searchId, skills: skillsData}, (_err: Error, _res: HeroInterface) => {
                          return res.status(200).send(hero);
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
              skillsModel.find({_id: data.skills},(err: Error, skillData: SkillInterface[]) => {
				res.send({id: data.id, name: data.name, universe: universeData.universe, skills: skillData.map((obj: SkillInterface) => obj.skill)});
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
        universeModel.findOne({universe: hero.universe}, (err: Error, _res: UniverseInterface) => {
          skillsModel.find({skill: hero.skills}, (err: Error, skillsData: SkillInterface[]) => {
			const qHero = {name: hero.name, universe: _res._id, skills: skillsData};
			const query = {$set: qHero};
			this.model.updateOne({name: oldName}, query, () => {
			  // if (err) {return res.send(err); }
			  res.send({message: `Hero ${oldName} was update - ${hero.name}: ${hero.universe}`});
		   });
		  })
        });
    }

    private deleteHero = (req: express.Request, res: express.Response) => {
        const deleteName: string = req.params.name;
        console.log(`Hero to delete ${deleteName}`);
        this.model.deleteOne({name: deleteName}, (err: Error) => {
            // if(err) res.send(err)
            res.send({message: `Hero ${deleteName} was deleted`});
        });
    }
}

export default HeroController;
