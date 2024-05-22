import { Router } from 'express';
import * as productController from '../controllers/productController';

const router = Router();

router.post('/create', productController.createProduct);
router.put('/update/:productId', productController.updateProduct);
router.get('/list', productController.listProducts);
router.get('/detail/:productId', productController.getProductDetail);
router.delete('/delete/:productId', productController.deleteProduct);
router.get('/top-selling', productController.listTopSellingProducts);

export default router;
