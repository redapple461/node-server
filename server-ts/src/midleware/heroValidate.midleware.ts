import jwt from 'jsonwebtoken';
import config from 'config';

export const heroValid = (req, res, next) => {
	try {
		console.log(req.body);
		if (req.body.name === undefined) {
            return res.status(400).send({error: 'name is undefined'});
		}
		if (req.body.name === '') {
            return res.status(400).send({error: 'name is empty'});
		}
		if (req.body.universe === undefined) {
			req.body.universe = 'Marvel';
		}
		if (req.body.universe === '') {
			req.body.universe = 'Marvel';
		}
		next();
	} catch (e) {
		console.log(e);
		return res.status(500).send({error: e.message});
	}
};
