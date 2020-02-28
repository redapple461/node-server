import mongo from 'mongoose';
import config from 'config';

const ObjectId = mongo.Types.ObjectId;
const Schema = mongo.Schema;
const {host, port, name} = config.get('mongoDB');
const connectUrl = `mongodb://${host}:${port}/${name}`;
const hero = new Schema({
    id: {type: Number},
    name: {type: String, unique: true},
    universe: {type: ObjectId, link: 'univers'},
    skills: {type: ObjectId, link: 'skills'}
});

const universe = new Schema({
  universe: {type: String, unique: true}
});

const skills = new Schema({
  hero_id: {type: ObjectId, unique: true , link: 'heroes'},
  skills: {type: [String]}
});

const user = new Schema({
  email: {type: String, required: true, unique: true},
  phone: {type: String, required: true},
  name: {type: String, required: true},
  surname: {type: String, required: true},
  password: {type: String, required: true}

});

const db = mongo.connect(connectUrl, (err: Error, res: mongo.Response) => {
    console.log('Connect to ' + db + res);
});

export const User = mongo.model('user', user, 'user');

export const universeModel = mongo.model('universe', universe, 'universe');

export const heroModel = mongo.model('heroes', hero, 'heroes');

export const skillsModel = mongo.model('skills', skills, 'skills');
