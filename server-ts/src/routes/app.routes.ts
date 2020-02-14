import * as express from 'express';
import Hero from '../models/schema';
import { Schema } from 'mongoose';
import { HeroModel } from '../models/hero.model';


class HeroController {
    public router: express.Router = express.Router();
    private model: Schema = Hero;

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
            return this.model.find({}, (err: Error, data: object) => {
                res.send(data);
            });
        }

    private addHero = (req: express.Request, res: express.Response) => {
        if (req.body.name === undefined) {
            return res.status(400).send({error: 'name is undefined'});
        }
        const hero: HeroModel = req.body;
        if (hero.universe === undefined) {
            hero.universe = '';
        }
        console.log('hero to post: ' + hero);
        this.model.countDocuments({}, (err: Error, c: number) => {
            console.log('Count is : ' + c);
            hero.id = c + 1;
            // check if hero already exists response with message
            this.model.exists({name: hero.name}, (searchErr: any, searchRes: any) => {
                // if(searchErr) console.log(err)
                if(!searchRes) {
                    this.model.create(hero, (_err: Error, _res: any) => {
                        return res.status(200).send(hero);
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
        this.model.findOne({name: searchName}, (err: any, data: HeroModel) => {
            // if(err) res.send(err)
            res.send(data);
        });
    }

    private updateHero = (req: express.Request, res: express.Response) => {
        if (req.body.name === undefined) {
            return res.status(400).send({error: 'Name is undefined'});
        }
        const oldName: string = req.params.oldName;
        const hero: HeroModel = req.body;
        console.log(`Old name ${oldName} will update with values ${hero.name}: ${hero.universe}`);
        const query = {$set: hero};
        this.model.updateOne({name: oldName}, query, (err: any) => {
            // if(err) return res.send(err)
            res.send({message: `Hero ${oldName} was update - ${hero.name}: ${hero.universe}`});
        });
    }

    private deleteHero = (req: express.Request, res: express.Response) => {
        const deleteName: string = req.params.name;
        console.log(`Hero to delete ${deleteName}`);
        this.model.deleteOne({name: deleteName}, (err: any) => {
            // if(err) res.send(err)
            res.send({message: `Hero ${deleteName} was deleted`});
        });
    }
}

export default HeroController;
