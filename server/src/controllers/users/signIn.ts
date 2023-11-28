import { Request, Response, NextFunction } from 'express';
import { error, notfound, badrequest } from 'handlers/response.handler';
import { IUser, User } from 'models/user';
import bcrypt from 'bcrypt';
import { userExist } from 'controllers';

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: IUser = req.body;

    const exist = await userExist(user);
    if (!exist) return notfound(res, `The user ${user.nickName} doesn't exist`);
    const existingUser: IUser | null = await User.findOne({
      nickName: user.nickName
    });

    existingUser &&
      bcrypt.compare(
        user.password,
        existingUser.password,
        function (err, isMatch) {
          if (err) {
            return next(err);
          } else if (!isMatch) {
            return badrequest(res, 'Incorrect password');
          } else {
            return res.status(201).send({
              message: 'User logged in',
              nickName: user.nickName
            });
          }
        }
      );
  } catch (err) {
    if (err instanceof Error) {
      error(res);
    }

    return next(err);
  }
};
