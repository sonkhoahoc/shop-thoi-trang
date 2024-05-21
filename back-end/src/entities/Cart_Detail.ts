import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Cart_Detail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cart_id: number;

  @Column()
  product_id: number;

  @Column()
  product_name: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  size: string;

  @Column()
  sex: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column()
  brand: string;

  @Column()
  supplier: string;

  @Column()
  avata: string;

  @CreateDateColumn({ type: 'timestamp' })
  create_time: Date;
  
}