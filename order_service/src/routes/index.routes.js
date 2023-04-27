import express from 'express';
import orderRouter from './order.routes';

const router = express.Router();

router.use('/order', orderRouter);

export default router;