import { NextFunction, Request, Response } from 'express';
import { error, badrequest, created, notfound } from '../handlers/response.handler';
import { User, IUser } from '../models/user';
import bcrypt from 'bcrypt';
const saltRounds = 10;

const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: IUser = req.body;

    const exist = await userExist(user);
    if (!exist) return notfound(res, `The user ${user.nickName} doesn't exist`);
    const existingUser: IUser | null = await User.findOne({ nickName: user.nickName });

    existingUser &&
      bcrypt.compare(user.password, existingUser.password, function (err, isMatch) {
        if (err) {
          return next(err);
        } else if (!isMatch) {
          return badrequest(res, 'Incorrect password');
        } else {
          return res.status(201).send({ message: 'User logged in', nickName: user.nickName });
        }
      });
  } catch (err) {
    if (err instanceof Error) {
      error(res);
    }

    return next(err);
  }
};

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: IUser = req.body;
    const exist = await userExist(user);
    if (exist) return badrequest(res, `The user ${user.nickName} already exist`);

    bcrypt.genSalt(saltRounds, function (saltError, salt) {
      if (saltError) {
        throw saltError;
      } else {
        return bcrypt.hash(user.password, salt, async (hashError, hash) => {
          if (hashError) {
            throw hashError;
          } else {
            await User.create({ nickName: user.nickName, password: hash });
          }
        });
      }
    });

    return created(res, { nickName: user.nickName, message: `User ${user.nickName} created successfully` });
  } catch (err: unknown) {
    if (err instanceof Error) {
      error(res);
    }

    return next(err);
  }
};

const userExist = async (user: IUser) => {
  const existingUser: IUser | null = await User.findOne({ nickName: user.nickName });
  return existingUser;
};

export default {
  signUp,
  signIn
};
