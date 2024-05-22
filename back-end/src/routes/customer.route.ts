import express, { Router } from 'express';
import { create_customer, update_customer, login_customer, list_customer, detail_customer, delete_customer } from '../services/customerService';

const router: Router = Router();

router.get('/list', list_customer);
router.get('/customer/:id', detail_customer);
router.post('/login', login_customer);
router.post('/create', create_customer);
router.put('/update/:id', update_customer);
router.delete('/delete/:id', delete_customer);

export default router;