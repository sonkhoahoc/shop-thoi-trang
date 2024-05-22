import { Router } from 'express';
import adminRouter from './admin.route';
import customerRouter from './customer.route';
import productRouter from './product.route';
import category_productRouter from './category_product.route';

const router = Router();

router.use("/Admin", adminRouter);

router.use("/Customer", customerRouter);

router.use("/Product", productRouter);

router.use("/Category-Product", category_productRouter);

export default router;