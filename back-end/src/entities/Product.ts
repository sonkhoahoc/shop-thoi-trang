import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    category: string;

    @Column()
    name: string;

    @Column()
    import_price: number;

    @Column()
    price: number;

    @Column()
    description: string;

    @CreateDateColumn({ type: 'timestamp' })
    date_added: Date;
}