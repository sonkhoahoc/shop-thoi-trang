import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Customer } from '../entities/Customer';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY_TOKEN ="3c5218a91f55415092f168557561f603";

export const create_customer = async (req: Request, res: Response) => {
    try {
        const customer_data = req.body;
        const customerRepository = await getRepository(Customer);

        //Kiểm tra tài khoản tồn tại chưa
        const extingCustomer = await customerRepository.findOne({
            where: {
                email: customer_data.email
            }
        });

        if (customer_data) {
            return res.status(400).send({
                Status: 400,
                Message: 'Tài khoản đã tồn tại'
            });
        } else {
            const hassPass = await bcrypt.hash(customer_data.password, 10);

            //nếu không có tài khoản sẽ tạo tài khoản
            const create_customer = await customerRepository.create({
                email: customer_data.email,
                password: hassPass,
                name: customer_data.name,
                phone_number: customer_data.phone_number,
                address: customer_data.address
            });
            await customerRepository.create(create_customer);
            return res.status(200).send({
                Status: 200,
                Message: 'Tạo tài khoản thành công'
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            Status: 500,
            Message: 'Có lỗi trong quá trình xử lý'
        })
    }
}

export const update_customer = async (req: Request, res: Response) => {
    try {
        const customer_data = req.body;
        const customerRepository = await getRepository(Customer);

        let hasPass = await customer_data.password;
        if (customer_data.password) {
            hasPass = await bcrypt.hash(customer_data.password, 10);
        };

        //update lại dữ liệu
        await customerRepository.update(Number(req.params.id), {
            name: customer_data.name,
            email: customer_data.email,
            password:  hasPass,
            phone_number: customer_data.phone_number,
            address: customer_data.address
        });
        const update_customer = await customerRepository.findOne({
            where: {
                email: customer_data.email,
            }
        })
        return res.status(200).send({
            Status: 200,
            Message: 'Cập nhật thành công',
            Data: update_customer
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            Status: 500,
            Message: 'Có lỗi trong quá trình xử lý'
        })
    }
}

export const login_customer = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const customerRepository = await getRepository(Customer);

        //Lấy thông tin email
        const customer = await customerRepository.findOne({
            where: {
                email: email
            }
        });

        //Kiểm tra tồn tại hay chưa
        if (!customer) {
            return res.status(400).send({
                Status: 400,
                Message: 'Tài khoản không tồn tại'
            });
        } else {
            //kiểm tra mật khẩu
            const is_pass = await bcrypt.compare(password, customer.password);
            if (is_pass){
                //Tạo token
                const payload = {
                    id: customer.id,
                    name: customer.name,
                };
                const token = jwt.sign(payload, SECRET_KEY_TOKEN, {
                    expiresIn: 3600
                });
                return res.status(200).send({
                    Status: 200,
                    Message: 'Đăng nhập thành công',
                    Token: token
                });
            } else {
                return res.status(400).send({
                    Status: 400,
                    Message: 'Mật khẩu không chính xác'
                });
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            Status: 500,
            Message: 'Có lỗi trong quá trình xử lý'
        })
    }
}

export const list_customer = async (req: Request, res: Response) => {
    try {
        const customerRepository = await getRepository(Customer);
        const customer_data = await customerRepository.find({
            order: {
                id: 'ASC'
            }
        });
        return res.status(200).send({
            Status: 200,
            Message: 'Lấy danh sách tài khoản thành công',
            Data: customer_data
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            Status: 500,
            Message: 'Có lỗi trong quá trình xử lý'
        })
    }
}

export const detail_customer = async (req: Request, res: Response) => {
    try {
        const customer_id = Number(req.params.id);
        const customerRepository = await getRepository(Customer);

        //Lấy thông tin
        const customer_data = await customerRepository.findOne({
            where: {
                id: customer_id
            }
        });

        if (!customer_data) {
            return res.status(400).send({
                Status: 400,
                Message: 'Không tìm thấy tài khoản'
            });
        } else {
            return res.status(200).send({
                Status: 200,
                Message: 'Lấy thông tin tài khoản thành công',
                Data: customer_data
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            Status: 500,
            Message: 'Có lỗi trong quá trình xử lý'
        })
    }
}

export const delete_customer = async (req: Request, res: Response) => {
    try {
        const customer_id = Number(req.params.id);
        const customerRepository = await getRepository(Customer);

        //Lấy thông tin
        const customer_data = await customerRepository.findOne({
            where: {
                id: customer_id
            }
        });

        if (!customer_data) {
            return res.status(400).send({
                Status: 400,
                Message: 'Không tìm thấy tài khoản'
            });
        } else {
            await customerRepository.remove(customer_data);
            return res.status(200).send({
                Status: 200,
                Message: 'Xóa tài khoản thành công',
                Data: customer_data
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            Status: 500,
            Message: 'Có lỗi trong quá trình xử lý'
        })
    }
}