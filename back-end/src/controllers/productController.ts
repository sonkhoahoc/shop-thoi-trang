import { Request, Response } from 'express';
import * as productService from '../services/productService';

export const createProduct = async (req: Request, res: Response): Promise<Response> => {
    return productService.create(req, res);
};

export const updateProduct = async (req: Request, res: Response): Promise<Response> => {
    return productService.update(req, res);
};

export const listProducts = async (req: Request, res: Response): Promise<Response> => {
    return productService.list(req, res);
};

export const getProductDetail = async (req: Request, res: Response): Promise<Response> => {
    return productService.detail(req, res);
};

export const deleteProduct = async (req: Request, res: Response): Promise<Response> => {
    return productService.remove(req, res);
};

export const listTopSellingProducts = async (req: Request, res: Response): Promise<Response> => {
    return productService.listProductTop(req, res);
};
