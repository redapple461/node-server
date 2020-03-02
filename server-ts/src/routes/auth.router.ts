import * as express from 'express';
import {User} from '../models/schema';
import bcrytp from 'bcryptjs';
import {check, validationResult} from 'express-validator';
import jwt from 'jsonwebtoken';
import config from 'config';
import hbs from 'nodemailer-express-handlebars';
import nodemailer from 'nodemailer';
import { UserInterface } from '../models/User.model';
import fs from 'fs';

// tslint:disable: align
class AuthController {
  public router: express.Router;

  constructor () {
		this.router = express.Router();
		this.initRoutes();
  }

  private initRoutes () {
    this.router.post(
			'/register',
			[
        check('email', 'Missed email').exists(),
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Password is missed').exists(),
				check('password', 'Minimum password length is 7 ').isLength({min: 7})
			],
			 this.register
		);
		this.router.post(
			'/login',
			[
        check('email', 'Empty email').exists(),
        check('email', 'Incorrect email').normalizeEmail().isEmail(),
				check('password', 'Empty passowrd').exists()
			],
			 this.login
		);
		this.router.get('/forgot', this.forgotPassword);
  }

  private async register (req: express.Request, res: express.Response){
      try {
          console.log(req.body);
					const errors  = validationResult(req);
					if (!errors.isEmpty()){
						return res.status(400).send({errors, message: 'Incorrect date for register'});
					}
        	const {email, phone, name, surname, password} = req.body;
					const candidate = await User.findOne({ email });
        	if (candidate) {
						return res.status(400).send({message: 'User with this email already exists'});
					}
					const hashPassword = await bcrytp.hash(password, 5);
					console.log(hashPassword);
					const user = new User({email, phone, name, surname, password: hashPassword});
					await user.save();
					res.status(200).send({message: 'User registed'});
      } catch (e) {
       	 	return res.status(500).send({error: 'Some server error'});
      }

	}

	// tslint:disable: align
	private async login (req: express.Request, res: express.Response) {
		try {
			console.log(req.body);
			const errors  = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).send({errors, message: 'Inccorect data for login'});
			}

			const {email, password} = req.body;
			const user = await User.findOne({ email });
			if (!user) {
				return res.status(400).send({message: 'User with current email didnt exists'});
			}


			const isPasswordsMatch = await bcrytp.compare(password, user.password);
			// Better to not send message about password , just say Data is incorrect
			if (!isPasswordsMatch) {
				return res.status(400).send({message: 'Wrong password, try again'});
			}

			const token = jwt.sign(
				{ userId: user._id },
				config.get('jwtSecret')
			);

			res.send({ token, user});

		} catch (e) {
				return res.status(500).send({error: 'Some server error'});
		}
	}

	private async forgotPassword (req: express.Request, res: express.Response) {
		const email = 'toursofheroes@gmail.com';
		const passowrd = '76667655dD';
		const url = 'vk.com';
		const smtpTransport = nodemailer.createTransport({
			service: 'gmail',
			auth: {
			  user: email,
			  pass: passowrd
			}
		});
		User.findOne({email: req.body.email}, (err, userData: UserInterface) => {
			if (err) {
				res.status(400).send({err});
			}
			const data = {
				to: userData.email,
				from: email,
				html: {path: './templates/forgot-password.html'},
				subject: 'Password help has arrived!'
			};
			smtpTransport.sendMail(data, (mailErr) => {
				if (!mailErr) {
					return res.send('Check email');
				}
				res.send({err: mailErr.message});
			});
		});

	}
}

export default AuthController;
