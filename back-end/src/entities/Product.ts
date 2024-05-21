import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { Product_Image } from './Product_Image';
import { Brand } from './Brand';
import { Supplier } from './Supplier';
import { Product_Size } from './Product_Size';


@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    category: string;

    @Column()
    name: string;

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
    avatar: string;

    @OneToMany(() => Product_Image, product_image => product_image.product)
    images: Product_Image[];

    @OneToMany(() => Product_Size, product_size => product_size.product)
    product_size: Product_Size

    @ManyToOne(() => Brand, brand => brand.products)
    brand: Brand;

    @ManyToOne(() => Supplier, )
    supplier: Supplier;

    @CreateDateColumn({ type: 'timestamp' })
    date_added: Date;
}