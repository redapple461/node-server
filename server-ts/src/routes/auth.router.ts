import * as express from 'express';
import {User} from '../models/schema';
import bcrytp from 'bcryptjs';
import {check, validationResult} from 'express-validator';
import jwt from 'jsonwebtoken';
import config from 'config';
import nodemailer from 'nodemailer';
import { auth } from '../midleware/auth.midleware';
import mongo from 'mongoose';
import UserController from './user.routes';

// tslint:disable: align
class AuthController {
	public router: express.Router;

	constructor (private userController: UserController) {
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
			this.register, this.userController.addUser
		);
		this.router.post(
			'/login',
			[
				check('email', 'Empty email').exists(),
				check('email', 'Incorrect email').normalizeEmail().isEmail(),
				check('password', 'Empty passowrd').exists()
			],
			this.userController.getUser, this.login
		);
		this.router.post('/forgot', this.userController.getUser, this.forgotPassword);
		this.router.post('/resetPassword', auth, this.changePassword, this.userController.updateUser);
	}

	private async register (req: express.Request, res: express.Response, next: express.NextFunction) {
		try {
			console.log(req.body);
			const errors  = validationResult(req);
			if (!errors.isEmpty()) {
				console.log('wrong data');
				return res.status(400).send({errors, message: 'Incorrect date for register'});
			}
			const {email, phone, name, surname, password} = req.body;
			const candidate = await User.findOne({ email });
			if (candidate) {
				console.log('Canidate already exist');
				return res.status(400).send({message: 'User with this email already exists'});
			}
			const hashPassword = await bcrytp.hash(password, 5);
			console.log(hashPassword);
			req.body.user = {email, phone, name, surname, password: hashPassword}
			next();
		} catch (e) {
			console.log(e);
			return res.status(500).send({error: 'Some server error'});
		}
	}

	// tslint:disable: align
	private async login (req: express.Request, res: express.Response) {
		try {
		const passowrd = req.body.password;
		const user = req.body.user;
		const isPasswordsMatch = await bcrytp.compare(passowrd, user.password);
		console.log(isPasswordsMatch);
			// Better to not send message about password , just say Data is incorrect
		if (!isPasswordsMatch) {
			return res.status(400).send({error: 'Wrong password, try again'});
		}
		const token = jwt.sign(
			{ userId: user._id },
			config.get('jwtSecret'),
			{ expiresIn: '1m' }
		);
		res.send({ token, user});
		} catch (e) {
        	console.log(e);
			return res.status(500).send({error: 'Some server error'});
		}
	}

	private async changePassword (req: express.Request, res: express.Response, next: express.NextFunction) {
		const id: mongo.Types.ObjectId = req.body.userData.userId;
		const password: string = req.body.password;
		req.params.id = id;
		req.body.passowrd = password;
		next();
	}

	private async forgotPassword (req: express.Request, res: express.Response) {
    	console.log(req.body);
		const email = 'toursofheroes@gmail.com';
		const passowrd = '76667655dD';
		const smtpTransport = nodemailer.createTransport({
			service: 'gmail',
			auth: {
			  user: email,
			  pass: passowrd
			}
   		});
		const user = req.body.user;
		const token = jwt.sign(
			{ userId: user._id },
			config.get('jwtSecret')
		);
		const urlReact = `http://localhost:3000/resetPassword/${token}`;
		const urlAngular = `http://localhost:4200/resetPassword/${token}`
		const data = {
			to: user.email,
			from: email,
			html: `
			<head>
				<title>Forget Password Email</title>
			</head>
			<body>
				<h3> Dear ${user.name} </h3>
				<p> You Request for a password reset, follow this <a href="${urlReact}">link for React app</a>  or this <a href="${urlAngular}"> link for Angular app</a>to reset your password
			</body>
			`,
			subject: 'Password help has arrived!'
		};
		smtpTransport.sendMail(data, (mailErr) => {
			if (!mailErr) {
				return res.send({message: 'Check email'});
			}
			res.send({err: mailErr.message});
		});
	}
}

export default AuthController;
