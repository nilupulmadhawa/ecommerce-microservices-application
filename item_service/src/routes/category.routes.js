import express from 'express';
import { create, getAll, getById, remove, update } from '../controllers/category';
import { celebrate, Segments } from 'celebrate'

import { protect } from '../middleware/auth'

const categoryRouter = express.Router();

categoryRouter.post('/', create);
categoryRouter.get('/', getAll);
categoryRouter.get('/:id', getById);
categoryRouter.patch('/:id', update);
categoryRouter.delete('/:id', remove);

// categoryRouter.post('/', celebrate({ [Segments.BODY]: addLocationSchema }), create);
// categoryRouter.get('/', celebrate({ [Segments.QUERY]: categoryViewSchema }), getAll);
// categoryRouter.get('/:id', celebrate({ [Segments.PARAMS]: categoryIdSchema }), getById);
// categoryRouter.patch('/:id', celebrate({ [Segments.PARAMS]: categoryIdSchema }), update);
// categoryRouter.delete('/:id', celebrate({ [Segments.PARAMS]: categoryIdSchema }), remove);

export default categoryRouter;