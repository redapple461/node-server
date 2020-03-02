import * as express from 'express';
import { auth } from '../midleware/auth.midleware';
import {User} from '../models/schema';
import { UserInterface } from '../models/User.model';

class UserController {
    public router: express.Router = express.Router();

    constructor () {
      this.initRoutes();
    }

    public initRoutes () {
	  this.router.put('/updateUser/:id', auth, this.updateUser);
	  this.router.get('/getUser/:id', auth, this.getUser);
    }

    private  updateUser = (req: express.Request, res: express.Response) => {
      User.updateOne({_id: req.params.id}, {$set: req.body}, (err) => {
        if (err) {
          return res.status(400).send({error: 'Some error'});
        }
        res.status(201).send({msg: 'user was updated'});
      });
	}

	// tslint:disable-next-line: align
	private getUser = (req: express.Request, res: express.Response) => {
		User.findOne({_id: req.params.id}, (err: Error, data: UserInterface) => {
			if (err) {
				res.status(400).send(err.message);
			}
			res.send(data);
		});
	}
}

export default UserController;
