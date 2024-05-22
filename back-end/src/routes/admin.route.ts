import express , { Router } from 'express';
import { create_admin, update_admin, list_admin, delete_admin, detail_admin, login_admin } from '../services/adminService';

const router: Router = express.Router();

router.get('/list', list_admin);
router.get('/admin/:id', detail_admin);
router.post('/login', login_admin);
router.post('/create', create_admin);
router.put('/update/:id', update_admin);
router.delete('/delete/:id', delete_admin);

export default router;