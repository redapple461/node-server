import * as express from 'express';
import { auth } from '../midleware/auth.midleware';
import {User} from '../models/schema';
import { validationResult } from 'express-validator';

class UserController {
    public router: express.Router = express.Router();

    constructor () {
      this.initRoutes();
    }

    public initRoutes () {
      this.router.put('/updateUser/:id', auth, this.updateUser);
      this.router.get('/getUser/:id', auth, this.getUser);
      this.router.delete('/deleteUser/:email', auth, this.deleteUser);
    }

    public  updateUser = (req: express.Request, res: express.Response) => {
      User.updateOne({_id: req.params.id}, {$set: req.body}, (err) => {
        if (err) {
          return res.status(400).send({error: 'Some error'});
        }
        res.status(201).send({msg: 'user was updated'});
      });
    }

    public addUser = async (req: express.Request, res: express.Response) => {
      console.log(req.body.user);
      const user = new User(req.body.user);
      await user.save();
      return res.send({message: 'User registed'});
    }

    public deleteUser = async (req: express.Request, res: express.Response) => {
      console.log(`User to delete ${req.params.email}`);
      User.deleteOne({email: req.params.email}, () => {
        res.status(201).send({message: `User ${req.params.email} was deleted`});
      });
    }

	// tslint:disable-next-line: align
    public getUser = async (req: express.Request, res: express.Response , next: express.NextFunction) => {
      try {
        console.log(req.body);
        const errors  = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).send({errors, message: 'Inccorect data for login'});
        }
        const email = req.body.email;
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(400).send({error: 'User with current email didnt exists'});
        }
        req.body.user = user;
        next();
      } catch (e) {
        console.log(e);
        return res.status(500).send({error: e.message});
      }
    }
}

export default UserController;
