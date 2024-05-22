import { Router } from 'express';
import * as category_productController from '../controllers/category_productController';

const router = Router();

router.post('/create', category_productController.create);
router.put('/update/:id', category_productController.update);
router.get('/list', category_productController.list);
router.get('/detail/:id', category_productController.detail);
router.delete('/delete/:id', category_productController.remove);

export default router;