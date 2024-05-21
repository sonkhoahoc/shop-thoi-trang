import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity()
export class Supplier {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Product, product => product.supplier)
    products: Product[];

    @CreateDateColumn({ type: 'timestamp' })
    date_added: Date;
}