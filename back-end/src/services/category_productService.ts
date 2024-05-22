import { getRepository } from "typeorm";
import { Category_Product } from "../entities/Category_Product";
import { Request, Response } from "express";
import * as dotenv from 'dotenv';
dotenv.config();

/**
 * Tạo 1 danh mục mới
 * @param req Request object từ client.
 * @param res Response object để gửi kết quả về client.
 */
export const create_product = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, parent_id } = req.body;
        const category_productRepository = getRepository(Category_Product);
        const new_category = category_productRepository.create({
            name, 
            parent_id
        });
        await category_productRepository.save(new_category);

        return res.status(201).send({
            Status: 201,
            Data: new_category
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            Status: 500,
            Message: "Có lỗi trong quá trình xử lý"
        });
    }
}

/**
 * update 1 danh mục theo id
 * @param req Request object từ client.
 * @param res Response object để gửi kết quả về client.
 */
export const update_product = async (req: Request, res: Response): Promise<Response> => {
    try{
        const {name, parent_id} = req.body;
        const category_productRepository = getRepository(Category_Product);
        const update_category = await category_productRepository.update(
            Number(req.params.id),
            {name, parent_id}
        );
        return res.status(200).send({
            Status: 200,
            Data: update_category
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            Status: 500,
            Message: "Có lỗi trong quá trình xử lý"
        });
    }
}

/**
 * list danh mục theo
 * @param req Request object từ client.
 * @param res Response object để gửi kết quả về client.
 */
export const list_product = async (req: Request, res: Response): Promise<Response> => {
    try {
        const category_productResponse = getRepository(Category_Product);
        const categories = await category_productResponse.find();

        return res.status(200).send({
            Status: 200,
            Data: categories.filter(category => category.name.toLowerCase())
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            Status: 500,
            Message: "Có lỗi trong quá trình xử lý"
        });
    }
}

/**
 * lấy 1 danh mục theo id
 * @param req Request object từ client.
 * @param res Response object để gửi kết quả về client.
 */
export const detail_product = async (req: Request, res: Response): Promise<Response> => {
    try {
        const categoryId = Number(req.params.id);
        const category_productRepository = getRepository(Category_Product);
        const categories = await category_productRepository.findOne({
            where: {
                id: categoryId
            }
        });
        if (!categories) {
            return res.status(404).send({
                Status: 404,
                Message: "Không thấy danh mục"
            });
        }

        return res.status(200).send({
            Status: 200,
            Data: categories
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            Status: 500,
            Message: "Có lỗi trong quá trình xử lý"
        });
    }
}

/**
 * Xoá 1 danh mục theo id
 * @param req Request object từ client.
 * @param res Response object để gửi kết quả về client.
 */
export const remove_product = async (req: Request, res: Response): Promise<Response> => {
    try {
        const categoryId = Number(req.params.id);
        const category_productRepository = getRepository(Category_Product);
        const categories = await category_productRepository.findOne({
            where: {
                id: categoryId
            }
        });
        if (!categories) {
            return res.status(404).send({
                Status: 404,
                Message: "Không thấy danh mục"
            });
        }

        await category_productRepository.remove(categories);
        return res.status(200).send({
            Status: 200,
            Mesage: "Thành công"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            Status: 500,
            Message: "Có lỗi trong quá trình xử lý"
        });
    }
}