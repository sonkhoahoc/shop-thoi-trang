import { Request, Response } from 'express';
import { create_admin, update_admin, list_admin, delete_admin, detail_admin, login_admin } from '../services/adminService';

export const create = async (req: Request, res: Response) => {
    await create_admin(req, res);
}

export const update = async (req: Request, res: Response) => {
    await update_admin(req, res);
}

export const list = async (req: Request, res: Response) => {
    await list_admin(req, res);
}

export const deleteByID = async (req: Request, res: Response) => {
    await delete_admin(req, res);
}

export const detail = async (req: Request, res: Response) => {
    await detail_admin(req, res);
}

export const login = async (req: Request, res: Response) => {
    await login_admin(req, res);
}