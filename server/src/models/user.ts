import { Model, model, Schema } from 'mongoose';

export interface IUser {
  nickName: string;
  password: string;
}
type UserModel = Model<IUser>;

const schema = new Schema<IUser, UserModel>(
  {
    nickName: {
      type: String,
      require: true
    },
    password: {
      type: String,
      require: true
    }
  },
  { timestamps: true }
);

export const User = model('Users', schema);
