import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product_Size } from "./Product_Size";

@Entity()

export class Size {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Product_Size, product_size => product_size.sizes)
    product_size: Product_Size[];

    @CreateDateColumn({ type: 'timestamp' })
    date_added: Date;
}