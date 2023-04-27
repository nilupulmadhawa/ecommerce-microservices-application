import express from 'express';
import { create, getAll, getById, remove, update, getRatingByBuyerId, getRatingByItemId } from '../controllers/rating';
import { celebrate, Segments } from 'celebrate'

import { protect } from '../middleware/auth'

const ratingRouter = express.Router();

ratingRouter.post('/', create);
ratingRouter.get('/', getAll);
ratingRouter.get('/:id', getById);
ratingRouter.patch('/:id', update);
ratingRouter.delete('/:id', remove);
ratingRouter.get('/buyer/:id', getRatingByBuyerId);
ratingRouter.get('/item/:id', getRatingByItemId);

export default ratingRouter;