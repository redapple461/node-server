import jwt from 'jsonwebtoken';
import config from 'config';

export const auth = (req, res, next) => {
	try {
		const token = req.headers.authorization;
		console.log(token);
		if (!token) {
			return res.status(401).send({message: 'No token'});
		}
		const decoded = jwt.verify(token, config.get('jwtSecret'));
		req.userId = decoded;
		next();
	} catch (e)	{
		return res.status(401).send({message: e.message});
	}
}
