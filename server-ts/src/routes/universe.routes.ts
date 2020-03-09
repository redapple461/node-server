import * as express from 'express';
import { universeModel } from '../models/schema';
import { auth } from '../midleware/auth.midleware';

class UniverseController {
    public router: express.Router = express.Router();

    constructor () {
        this.initRoutes();
    }

    public initRoutes () {
        this.router.get('/getUniverses', auth, this.getAllUniverses);
        // this.router.post('/addSkill', auth, this.addSkill);
        // this.router.get('/getSkill/:name', auth, this.getSkill);
        // this.router.delete('/deleteSkill/:name', auth, this.deleteSkill);
        // this.router.put('/updateSkill/:oldName', auth, this.updateSKill);
    }

    public getAllUniverses = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
		console.log('univserse find all');
	}

	// tslint:disable: align
	public addUniverse = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
		console.log('univserse adduniverse');
	}

	public findUniverseByName = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
		console.log(req.body.universe);
		universeModel.findOne({universe: req.body.universe}, (err,data) => {
			if (err) {console.log(err)}
			req.body.universeId = data._id;
			next();
		});
	}

	public findUniverseById = async (req: express.Request, res:express.Response, next: express.NextFunction) => {
		const universeId = req.body.hero.universe;
		universeModel.findOne({_id: universeId}, (err,data) => {
			if (err) {
				res.status(400).send({message: 'Some error in universe', error: err.message});
			}
			req.body.universe = data;
			next();
		});
	}
}

export default UniverseController;
