import {Request, Response} from "express";
import * as category_productService from "../services/category_productService";
import * as dotenv from 'dotenv';
dotenv.config();

export const create = async (req: Request, res: Response): Promise<Response> => {
    return await category_productService.create_product(req, res);
}

export const update = async (req: Request, res: Response): Promise<Response> => {
    return await category_productService.update_product(req, res);
}

export const list = async (req: Request, res: Response): Promise<Response> => {
    return await category_productService.list_product(req, res);
}

export const detail = async (req: Request, res: Response): Promise<Response> => {
    return await category_productService.detail_product(req, res);
}

export const remove = async (req: Request, res: Response): Promise<Response> => {
    return await category_productService.remove_product(req, res);
}