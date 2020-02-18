import mongo from 'mongoose';


export interface HeroInterface {
    id?: number;
    name: string;
    universe: mongo.Types.ObjectId;
    skills: mongo.Types.ObjectId[];
}
