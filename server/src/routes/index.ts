import { Router } from 'express';
import controllers from '../controllers/users';

const router = Router();

router.use('/signup', controllers.signUp);
router.use('/signin', controllers.signIn);

export default router;
