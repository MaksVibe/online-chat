import { NextFunction, Request, Response, Router } from 'express';
import { ok } from '../handlers/response.handler';
import controllers from '../controllers';

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    ok(res, 'Server is running...');
  } catch (error) {
    next(error);
  }
});
router.use('/signup', controllers.signUp);
router.use('/signin', controllers.signIn);
// router.use('/upload', controllers.signIn);

export default router;
