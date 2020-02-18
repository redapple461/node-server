import mongo from 'mongoose';
export interface UniverseInterface {
  _id?: mongo.Types.Objectid;
  universe: string;
}