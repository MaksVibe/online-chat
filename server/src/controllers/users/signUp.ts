import { userExist } from 'controllers';
import { Request, Response, NextFunction } from 'express';
import { User, IUser } from 'models/user';
import { badrequest, created, error } from '../../handlers/response.handler';
import bcrypt from 'bcrypt';

const saltRounds = 10;

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: IUser = req.body;
    const exist = await userExist(user);
    if (exist)
      return badrequest(res, `The user ${user.nickName} already exist`);

    bcrypt.genSalt(saltRounds, function (saltError, salt) {
      if (saltError) {
        throw saltError;
      } else {
        return bcrypt.hash(user.password, salt, async (hashError, hash) => {
          if (hashError) {
            throw hashError;
          } else {
            await User.create({
              nickName: user.nickName,
              password: hash
            });
          }
        });
      }
    });

    return created(res, {
      nickName: user.nickName,
      message: `User ${user.nickName} created successfully`
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      error(res);
    }

    return next(err);
  }
};
