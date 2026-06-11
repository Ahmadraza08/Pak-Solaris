// import express from 'express';
// import { addProduct, listProduct, removeProduct, singleProduct } from '../controllers/productController.js';
// import upload from '../middleware/multer.js';
// import adminAuth from '../middleware/adminAuth.js';

// const productRouter = express.Router();

// productRouter.post('/add', adminAuth,upload.fields([{name: 'image1', maxCount:1},{name: 'image2', maxCount:1},{name: 'image3', maxCount:1},{name: 'image4', maxCount:1}]),addProduct);
// productRouter.post('/remove',adminAuth, removeProduct);
// productRouter.post('/single', singleProduct);
// productRouter.get('/list', listProduct);

// // subCategory logic removed

// export default productRouter;

import express from 'express';
import { addProduct, listProduct, removeProduct, singleProduct, updatePrice } from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

productRouter.post('/add', adminAuth, upload.fields([{name: 'image1', maxCount:1},{name: 'image2', maxCount:1},{name: 'image3', maxCount:1},{name: 'image4', maxCount:1}]), addProduct);
productRouter.post('/remove', adminAuth, removeProduct);
productRouter.post('/single', singleProduct);
productRouter.get('/list', listProduct);

// --- YEH NAYI LINE ADD KI HAI ---
productRouter.post('/update-price', adminAuth, updatePrice);

// subCategory logic removed

export default productRouter;