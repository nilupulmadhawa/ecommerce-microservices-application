import express from 'express';
import ratingRouter from './rating.routes';

const router = express.Router();

router.use('/rating', ratingRouter);

export default router;