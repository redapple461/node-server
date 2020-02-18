import mongo from 'mongoose';
import config from 'config';

const ObjectId = mongo.Types.ObjectId;
const Schema = mongo.Schema;
const {host, port, name} = config.get('mongoDB');
const connectUrl = `mongodb://${host}:${port}/${name}`;
const hero = new Schema({
    id: {type: Number},
    name: {type: String, unique: true},
    universe: {type: ObjectId},
    skills: {type: [ObjectId]}
});

const universe = new Schema({
  universe: {type: String}
});

const skills = new Schema({
  skill: {type: String}
});

const db = mongo.connect(connectUrl, (err: Error, res: mongo.Response) => {
    console.log('Connect to ' + db + res);
});

export const universeModel = mongo.model('universe', universe, 'universe');

export const heroModel = mongo.model('heroes', hero, 'heroes');

export const skillsModel = mongo.model('skills', skills, 'skills');
