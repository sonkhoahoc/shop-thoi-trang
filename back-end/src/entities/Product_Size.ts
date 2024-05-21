import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { Size } from "./Size";

@Entity()

export class Product_Size {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @ManyToOne(() => Product, product => product.product_size)
    product: Product;

    @ManyToOne(() => Size, size => size.product_size)
    sizes: Size;

    @CreateDateColumn({ type: 'timestamp' })
    date_added: Date;
}