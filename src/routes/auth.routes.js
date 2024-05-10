import express from 'express';
import { login, register, currentUser } from '../controllers/auth';
import { celebrate, Segments } from 'celebrate'
import { protect } from '../middleware/auth';

const userRouter = express.Router();

userRouter.post('/login', login);
userRouter.post('/register', register);
userRouter.get('/current', protect, currentUser)


export default userRouter;