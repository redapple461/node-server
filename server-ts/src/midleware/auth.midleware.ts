import jwt from 'jsonwebtoken';
import config from 'config';
  		// tslint:disable: align
export const auth = (req, res, next) => {
	try {
		const token = req.headers.authorization;
		if (!token) {
			console.log('No token');
			return res.status(401).send({message: 'No token'});
		}
		console.log('auth: '+token);
		const decoded = jwt.verify(token, config.get('jwtSecret'));
  		req.body.userData = decoded;
		next();
	} catch (e)	{
    	console.log(e.message);
		return res.status(401).send({message: e.message});
	}
};
