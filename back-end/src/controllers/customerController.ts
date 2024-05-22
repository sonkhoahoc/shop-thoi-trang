import express, { Request, Response } from 'express';
import { create_customer, update_customer, login_customer, list_customer, detail_customer, delete_customer } from '../services/customerService';

export const create = async (req: express.Request, res: express.Response) => {
    await create_customer(req, res);
}

export const update = async (req: express.Request, res: express.Response) => {
    await update_customer(req, res);
}

export const login = async (req: express.Request, res: express.Response) => {
    await login_customer(req, res);
}

export const list = async (req: express.Request, res: express.Response) => {
    await list_customer(req, res);
}

export const detail = async (req: express.Request, res: express.Response) => {
    await detail_customer(req, res);
}

export const deleteByID = async (req: express.Request, res: express.Response) => {
    await delete_customer(req, res);
}