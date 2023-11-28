import { Router } from 'express';
import controllers from '../controllers';

const router = Router();

router.use('/signup', controllers.signUp);
router.use('/signin', controllers.signIn);
// router.use('/upload', controllers.signIn);

export default router;
