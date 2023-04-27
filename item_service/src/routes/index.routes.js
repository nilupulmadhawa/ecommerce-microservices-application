import express from 'express';
import itemRouter from './item.routes';

const router = express.Router();

router.use('/item', itemRouter);

export default router;