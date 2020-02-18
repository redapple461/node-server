import mongo from 'mongoose';
export interface SkillInterface {
  _id?: mongo.Types.ObjectId;
  skill: string;
}