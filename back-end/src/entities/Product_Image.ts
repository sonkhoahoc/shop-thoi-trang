import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './Product';

@Entity()
export class Product_Image {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true }) //cho phép nhận giá trị null
    image_url: string;

    @ManyToOne(() => Product, product => product.images)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @CreateDateColumn({ type: 'timestamp' })
    date_added: Date;
}