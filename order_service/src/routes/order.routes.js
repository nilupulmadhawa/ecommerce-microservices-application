import express from 'express';
import { create, getAll, getById, remove, update, } from '../controllers/order';
import { celebrate, Segments } from 'celebrate'

import { protect } from '../middleware/auth'

const orderRouter = express.Router();

orderRouter.post('/', create);
orderRouter.get('/', getAll);
orderRouter.get('/:id', getById);
orderRouter.patch('/:id', update);
orderRouter.delete('/:id', remove);

// orderRouter.post('/', celebrate({ [Segments.BODY]: addLocationSchema }), create);
// orderRouter.get('/', celebrate({ [Segments.QUERY]: orderViewSchema }), getAll);
// orderRouter.get('/:id', celebrate({ [Segments.PARAMS]: orderIdSchema }), getById);
// orderRouter.patch('/:id', celebrate({ [Segments.PARAMS]: orderIdSchema }), update);
// orderRouter.delete('/:id', celebrate({ [Segments.PARAMS]: orderIdSchema }), remove);

export default orderRouter;