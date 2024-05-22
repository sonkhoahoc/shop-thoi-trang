import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Admin } from '../entities/Admin';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY_TOKEN ="3c5218a91f55415092f168557561f603";

//Tạo tài khoản
export const create_admin = async (req: Request, res: Response) => {
    try {
        const admin_data = req.body;
        const adminRepository = await getRepository(Admin);

        //Kiểm tra xem tài khoản tồn tại chưa bằng email
        const exitingAdmin = await adminRepository.findOne({ 
            where: { email: admin_data.email },
         });

         if (exitingAdmin) {
            return res.status(400).send({
                Status: 400,
                Message: 'Tài khoản đã tồn tại'
            });
        }else {
            const hashPass = await bcrypt.hash(admin_data.password, 10);

            //nếu không có tài khoản nào tồn tại thì sẽ tạo tài khoản mới
            const create_admin = await adminRepository.create({
                email: admin_data.email,
                name: admin_data.name,
                password:  hashPass,
                phone_number: admin_data.phone_number,
            });
            await adminRepository.save(create_admin);
            return res.status(200).send({
                Status: 200,
                Message: 'Tạo tài khoản thành công',
                Data: create_admin,
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            Status: 500,
            Message: 'Có lỗi trong quá trình xử lý'
        });
    }
}

//Cập nhập tài khoản
export const update_admin = async (req: Request, res: Response) => {
    try {
        const admin_data = req.body;
        const adminRepository = getRepository(Admin);

        let hasPass = await admin_data.password;
        if (admin_data.password) {
            hasPass = await bcrypt.hash(admin_data.password, 10);
        };

        //update các thông tin trong csdl
        await adminRepository.update(Number(req.params.id), { name: admin_data.name, email: admin_data.email, password: hasPass, phone_number: admin_data.phone_number });
        
        //lấy thông tin đã cập nhật
        const update_admin = await adminRepository.findOne({
            where: {
                email: admin_data.email,
            }
        });
        return res.send({
            Status: 200,
            Message: 'Cập nhập thành công',
            Data: update_admin,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            Status: 500,
            Message: 'Có lỗi trong quá trình xử lý'
        });
    }
}

//Đăng nhập tài khoản
export const login_admin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const adminRepository = await getRepository(Admin);

        //Lấy thông tin email
        const admin = await adminRepository.findOne({
            where: {
                email: email,
            }
        })

        //Kiểm tra tồn tài hay chưa
        if (!admin){
            return res.status(400).send({
                Status: 400,
                Message: 'Tài khoản không tồn tại'
            });
        } else {
            //Kiểm tra mật khẩu
            const is_pass = await bcrypt.compare(password, admin.password)
            if (is_pass) {
                //Tạo token
                const payload = {
                    id: admin.id,
                    name: admin.name,
                };
                const token = jwt.sign(payload, SECRET_KEY_TOKEN, { expiresIn: 3600 });
                return res.status(200).send({
                    Status: 200,
                    Message: 'Đăng nhập thành công',
                    Token: token,
                });
            } else {
                return res.status(400).send({
                    Status: 400,
                    Message: 'Mật khẩu không đúng'
                });
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            Status: 500,
            Message: 'Có lỗi trong quá trình xử lý'
        });
    }
}

//lấy danh sách tài khoản
export const list_admin = async (req: Request, res: Response) => {
    try {
        const adminRepository = await getRepository(Admin);
        const admin_data = await adminRepository.find({
            order: {
                date_added: 'DESC',
            }
        });

        return res.status(200).send({
            Status: 200,
            Message: 'Lấy danh sách thành công',
            Data: admin_data,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            Status: 500,
            Message: 'Có lỗi trong quá trình xử lý'
        });
    }
}

//chi tiết tài khoản
export const detail_admin = async (req: Request, res: Response) => {
    try {
        const admin_id = Number(req.params.id);
        const adminRepository = await getRepository(Admin);

        //lấy thông tin chi tiết
        const admin_data = await adminRepository.findOne({
            where: {
                id: admin_id,
            }
        })

        if (!admin_data){
            return res.status(404).send({
                Status: 404,
                Message: 'Tài khoản không thấy'
            });
        } else {
            return res.status(200).send({
                Status: 200,
                Message: 'Lấy chi tiết thành công',
                Data: admin_data,
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            Status: 500,
            Message: 'Có lỗi trong quá trình xử lý'
        });
    }
}

//Xoá tài khoản
export const delete_admin = async (req: Request, res: Response) => {
    try {
        const admin_id = Number(req.params.id);
        const adminRepository = await getRepository(Admin);

        //Lấy tin từ cơ sở dữ liệu
        const admin_data = await adminRepository.findOne({
            where: {
                id: admin_id,
            }
        });

        if (!admin_data) {
            return res.status(404).send({
                Status: 404,
                Message: 'Tài khoản không tồn tại'
            });
        } else {
            await adminRepository.remove(admin_data);
            return res.status(200).send({
                Status: 200,
                Message: `Xoá ${admin_id} thành công`,
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            Status: 500,
            Message: 'Có lỗi trong quá trình xử lý'
        });
    }
}