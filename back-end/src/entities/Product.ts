import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { Product_Image } from './Product_Image';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    category: string;

    @Column()
    name: string;

    @Column()
    size: string;

    @Column({ default: 0 })
    import_price: number; //giá nhập vào

    @Column({ default: 0 })
    price: number; //giá bán ra

    @Column({ default: 0 })
    quantity: number; //Tổng số lượng sản phẩm

    @Column({ default: 0 })
    sold: number; //số sản phẩm đã bán

    @Column()
    description: string;

    @Column()
    brand: string;

    @Column()
    supplier: string;

    @Column()
    avatar: string;

    @OneToMany(() => Product_Image, productImage => productImage.product)
    images: Product_Image[];
    
    @CreateDateColumn({ type: 'timestamp' })
    date_added: Date;
}