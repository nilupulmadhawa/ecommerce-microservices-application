import express from 'express';
import { uploadFile, create, getAll, getById, remove, update, getSellerItems, getProductImage, deleteProductImage} from '../controllers/item';
import { celebrate, Segments } from 'celebrate'


import { protect } from '../middleware/auth'

// import multer from 'multer'

// const storage = multer.memoryStorage()
// const upload = multer({ storage: storage })

const itemRouter = express.Router();

itemRouter.post('/', create);
itemRouter.get('/', getAll);
itemRouter.get('/:id', getById);
itemRouter.patch('/:id', update);
itemRouter.delete('/:id', remove);
itemRouter.get('/seller/:id', getSellerItems);


// itemRouter.post('/', celebrate({ [Segments.BODY]: addLocationSchema }), create);
// itemRouter.get('/', celebrate({ [Segments.QUERY]: itemViewSchema }), getAll);
// itemRouter.get('/:id', celebrate({ [Segments.PARAMS]: itemIdSchema }), getById);
// itemRouter.patch('/:id', celebrate({ [Segments.PARAMS]: itemIdSchema }), update);
// itemRouter.delete('/:id', celebrate({ [Segments.PARAMS]: itemIdSchema }), remove);

export default itemRouter;