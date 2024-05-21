import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Product_Size } from './Product_SIze';

@Entity()
export class Size {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Product_Size, product_size => product_size.size)
    product_size: Product_Size[];

    @CreateDateColumn({ type: 'timestamp' })
    date_added: Date;
}