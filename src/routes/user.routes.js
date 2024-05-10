import express from 'express';
import { create, getAll, getById, remove, update, } from '../controllers/user';
import { celebrate, Segments } from 'celebrate'

import { protect } from '../middleware/auth'

const userRouter = express.Router();

userRouter.post('/', create);
userRouter.get('/', getAll);
userRouter.get('/:id', getById);
userRouter.patch('/:id', update);
userRouter.delete('/:id', remove);

// userRouter.post('/', celebrate({ [Segments.BODY]: addLocationSchema }), create);
// userRouter.get('/', celebrate({ [Segments.QUERY]: userViewSchema }), getAll);
// userRouter.get('/:id', celebrate({ [Segments.PARAMS]: userIdSchema }), getById);
// userRouter.patch('/:id', celebrate({ [Segments.PARAMS]: userIdSchema }), update);
// userRouter.delete('/:id', celebrate({ [Segments.PARAMS]: userIdSchema }), remove);

export default userRouter;