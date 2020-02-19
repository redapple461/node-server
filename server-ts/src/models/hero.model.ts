import mongo from 'mongoose';


export interface HeroInterface {
    _id?: mongo.TYpes.ObjectId;
    id?: number;
    name: string;
    universe: mongo.Types.ObjectId;
    skills: mongo.Types.ObjectId[];
}
