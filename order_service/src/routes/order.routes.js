import express from 'express';
import { create, getAll, getById, remove, update, getSellerOrders, getBuyerOrders } from '../controllers/order';
import { celebrate, Segments } from 'celebrate'

import { protect } from '../middleware/auth'

const orderRouter = express.Router();

orderRouter.post('/', create);
orderRouter.get('/', getAll);
orderRouter.get('/:id', getById);
orderRouter.patch('/:id', update);
orderRouter.delete('/:id', remove);
orderRouter.get('/seller/:id', getSellerOrders);
orderRouter.get('/buyer/:id', getBuyerOrders);

export default orderRouter;