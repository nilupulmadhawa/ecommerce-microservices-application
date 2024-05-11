import express from 'express';
import { create, getAll, getById, update, remove, getSellerCategories, getActiveCategories } from '../controllers/category';
import multer from 'multer';

const categoryRouter = express.Router();


// const storage = multer.diskStorage({
   
//   destination: (req, file, cb) => {
//     console.log(req);
//     cb(null, "icon");
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.body.name);
//   },
// });


// const upload = multer({ storage });


categoryRouter.post('/', create);
categoryRouter.get('/', getAll);
categoryRouter.get('/:id', getById);
categoryRouter.patch('/:id', update);
categoryRouter.delete('/:id', remove);
categoryRouter.get('/seller/:id', getSellerCategories);
categoryRouter.get('/active/seller/:id', getActiveCategories);
// categoryRouter.post('/upload/icons', upload.single('file'), uploadFile);
 

// categoryRouter.post('/', celebrate({ [Segments.BODY]: addLocationSchema }), create);
// categoryRouter.get('/', celebrate({ [Segments.QUERY]: categoryViewSchema }), getAll);
// categoryRouter.get('/:id', celebrate({ [Segments.PARAMS]: categoryIdSchema }), getById);
// categoryRouter.patch('/:id', celebrate({ [Segments.PARAMS]: categoryIdSchema }), update);
// categoryRouter.delete('/:id', celebrate({ [Segments.PARAMS]: categoryIdSchema }), remove);

export default categoryRouter;