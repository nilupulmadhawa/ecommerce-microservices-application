import express from 'express';
import userRouter from './user.routes';
import authRouter from './auth.routes';

const router = express.Router();

router.use('/user', userRouter);
router.use('/user', authRouter);

export default router;