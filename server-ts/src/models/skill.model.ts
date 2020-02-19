import mongo from 'mongoose';
export interface SkillInterface {
  _id?: mongo.Types.ObjectId;
  hero_id: mongo.Types.ObjectId;
  skills: string[];
}
