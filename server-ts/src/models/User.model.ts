import mongo from 'mongoose';

export interface UserInterface{
  _id?: mongo.Types.ObjectId;
  email: string;
  phone: string;
  name: string;
  surname: string;
  password: string;
}