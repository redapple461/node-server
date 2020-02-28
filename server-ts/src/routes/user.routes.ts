import * as express from 'express';
import { auth } from '../midleware/auth.midleware';
import {User} from '../models/schema';

class UserController {
    public router: express.Router = express.Router();

    constructor () {
        this.initRoutes();
    }

    public initRoutes () {
        this.router.put('/updateUser/:id', auth, this.updateUser);
    }

    private  updateUser = (req: express.Request, res: express.Response) => {
		User.updateOne({_id: req.params.id}, {$set: req.body}, (err) => {
			if (err) {
				return res.status(400).send({error: 'Some error'});
			}
			res.status(201).send({msg: 'user was updated'});
		});
    }
}

export default UserController;
