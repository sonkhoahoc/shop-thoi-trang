import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Category_Product{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    paren_id: number;

    @CreateDateColumn({ type: 'timestamp' })
    date_added: Date;
}