import { User, IUser } from '../models/user';
import { signIn } from './users/signIn';
import { signUp } from './users/signUp';

export const userExist = async (user: IUser) => {
  const existingUser: IUser | null = await User.findOne({
    nickName: user.nickName
  });
  return existingUser;
};

export default {
  signIn,
  signUp
};
