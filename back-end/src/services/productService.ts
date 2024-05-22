import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Product } from '../entities/Product';
import { Product_Image } from '../entities/Product_Image';

/**
 * Thêm sản phẩm mới
 */
export const create = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {
            category,
            name,
            size,
            import_price,
            price,
            quantity,
            sold,
            description,
            brand,
            supplier,
            avatar,
            images
        } = req.body;
        const productRepository = getRepository(Product);

        //Tạo mới sản phẩm
        const new_product = productRepository.create({
            category,
            name,
            size,
            import_price,
            price,
            quantity,
            sold,
            description,
            brand,
            supplier,
            avatar,
        });

        const save_product = await productRepository.save(new_product);

        //Lưu danh sách các ảnh chi tiết vào Product_Image
        const product_imageRepository = getRepository(Product_Image);
        const save_product_image = images.map((image_url: string) => ({
            image_url,
            product: save_product,
        }));
        await product_imageRepository.save(save_product_image);

        return res.status(201).json({
            Data: save_product,
            Status: 201,
            Message: "Thêm sản phẩm thành công",
        });
    } catch (error) {
       console.error(error);
       return res.status(500).json({
           Data: "Có lỗi trong quá trình xử lý",
           Status: 500,
           Message: "Có lỗi trong quá trình xử lý"
       });
    }
}

/**
 * update sản phẩm
 */
export const update = async (req: Request, res: Response): Promise<Response> => {
    try {
        const productId = +req.params.productId;
        const productRepository = getRepository(Product);
        const update_product = await productRepository.findOne({
            where: {
                id: productId
            }
        });

        if (!update_product) {
            return res.status(404).json({
                Status: 404,
                Message: "Không tìm thấy sản phẩm"
            });
        }

        //Cập nhập thông tin sản phẩm từ req.body
        productRepository.merge(update_product, req.body);

        //lấy danh sách hình ảnh mới từ req.body
        const { images } = req.body;

        //Xoá tất cả hình ảnh chi tiết của sản phẩm hiện có
        const product_imageRepository = getRepository(Product_Image);
        await product_imageRepository.delete({
            product: update_product
        });
        const product_update = await productRepository.save(update_product);
        //thêm sản phẩm mới vào product_image
        if (images && Array.isArray(images)) {
            for (const image_url of images) {
                const new_product_image = new Product_Image();
                new_product_image.image_url = image_url;
                new_product_image.product = product_update;
                await product_imageRepository.save(new_product_image);
            }
        }
        return res.status(200).json({
            Status: 200,
            Message: "Cập nhập sản phẩm thành công",
            Data: product_update
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            Status: 500,
            Message: "Có lỗi trong quá trình xử lý"
        });
    }
}

/**
 * Lấy danh sách sản phẩm
 */
export const list = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { category, brand, supplier, name } = req.query;
        console.log(category, brand, supplier);

        const productRepository = getRepository(Product);
        const products = await productRepository.find();
        let fillter_product = products;
        if (category != null) {
            fillter_product = fillter_product.filter(product_fillter => {
                const product_category = typeof category === 'string' ? category : '';
                return product_fillter.category.includes(product_category);
            });
        }
        if (name != null) {
            fillter_product = fillter_product.filter(product_fillter => {
                const product_name = typeof name === 'string' ? name.toLowerCase() : '';
                return product_fillter.name.toLowerCase().includes(product_name);
            });
        }
        if (brand!= null) {
            fillter_product = fillter_product.filter(product_fillter => {
                const product_brand = typeof brand === 'string' ? brand.toLowerCase() : '';
                return product_fillter.brand.toLowerCase().includes(product_brand);
            });
        }
        if (supplier!= null) {
            fillter_product = fillter_product.filter(product_fillter => {
                const product_supplier = typeof supplier === 'string' ? supplier.toLowerCase() : '';
                return product_fillter.name.toLowerCase().includes(product_supplier);
            });
        }
        console.log(fillter_product);
        return res.status(200).json({
            Status: 200,
            Message: "Lấy danh sách sản phẩm thành công",
            Data: fillter_product
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            Status: 500,
            Message: "Có lỗi trong quá trình xử lý"
        });
    }
}

/**
 * Lấy sản phẩm theo id
 */
export const detail = async (req: Request, res: Response): Promise<Response> => {
    try {
        const productId = +req.params.productId;
        const productRepository = getRepository(Product);
        console.log(productId);

        //lấy thông tin sản phẩm
        const product = await productRepository.findOne({
            where: {
                id: productId
            }
        });

        if (!product) {
            return res.status(404).json({
                Status: 404,
                Message: "Không tìm thấy sản phẩm"
            });
        }

        //lấy danh sách hình ảnh chi tiết từ product_image 
        const product_imageRepository = getRepository(Product_Image);
        const images = await product_imageRepository.find({
            where: {
                product: {
                    id: productId
                }
            }
        });

        //cho thông tin ảnh chi tiết vào sản phẩm
        const productWithimage = {
            ...product,
            images
        }

        return res.status(200).json({
            Status: 200,
            Message: "Lấy sản phẩm thành công",
            Data: productWithimage
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            Status: 500,
            Message: "Có lỗi trong quá trình xử lý"
        });
    }
}

/**
 * Xoá sản phẩm
 */
export const remove = async (req: Request, res: Response): Promise<Response> => {
    try {
        const productId = +req.params.productId;
        const productRepository = getRepository(Product);
        const delete_product = await productRepository.findOne({
            where: {
                id: productId
            }
        });
        if (!delete_product) {
            return res.status(404).json({
                Status: 404,
                Message: "Không tìm thấy sản phẩm"
            });
        }

        //Xoá tất hình ảnh chi tiết của sản phẩm
        const product_imageRepository = getRepository(Product_Image);
        await product_imageRepository.delete({
            product: delete_product
        });

        //Xoá sản phẩm
        await productRepository.remove(delete_product);
        return res.status(200).json({
            Status: 200,
            Message: "Xoá sản phẩm thành công",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            Status: 500,
            Message: "Có lỗi trong quá trình xử lý"
        });
    }
}

/**
 * Lấy danh sách sản phẩm bán chạy
 */
export const listProductTop = async (req: Request, res: Response): Promise<Response> => {
    try {
        const productRepository = getRepository(Product);
        const products = await productRepository.find({
            order: {
                sold: 'ASC'
            }, take: 10
        });
        const product_imageRepository = getRepository(Product_Image);
        for (let i = 0; i < products.length; i++) {
            const images = await product_imageRepository.find({
                where: {
                    product: {
                        id: products[i].id
                    }
                }
            });
            products[i].images = images;
        }
        return res.status(200).json({
            Status: 200,
            Message: "Lấy danh sách sản phẩm bán chạy thành công",
            Data: products
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            Status: 500,
            Message: "Có lỗi trong quá trình xử lý"
        });
    }
}