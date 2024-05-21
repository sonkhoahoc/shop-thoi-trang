import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity()
export class Brand {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Product, products => products.brand)
    products: Product[];

    @CreateDateColumn({ type: 'timestamp' })
    date_added: Date;
}