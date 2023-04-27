import express from 'express';
import { create, getAll, getById, remove, update, } from '../controllers/item';
import { celebrate, Segments } from 'celebrate'

import { protect } from '../middleware/auth'

const itemRouter = express.Router();

itemRouter.post('/', create);
itemRouter.get('/', getAll);
itemRouter.get('/:id', getById);
itemRouter.patch('/:id', update);
itemRouter.delete('/:id', remove);

// itemRouter.post('/', celebrate({ [Segments.BODY]: addLocationSchema }), create);
// itemRouter.get('/', celebrate({ [Segments.QUERY]: itemViewSchema }), getAll);
// itemRouter.get('/:id', celebrate({ [Segments.PARAMS]: itemIdSchema }), getById);
// itemRouter.patch('/:id', celebrate({ [Segments.PARAMS]: itemIdSchema }), update);
// itemRouter.delete('/:id', celebrate({ [Segments.PARAMS]: itemIdSchema }), remove);

export default itemRouter;