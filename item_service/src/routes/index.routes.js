import express from 'express';
import itemRouter from './item.routes';
import categoryRouter from './category.routes';

const router = express.Router();

router.use('/item', itemRouter);
router.use('/category', categoryRouter);


export default router;