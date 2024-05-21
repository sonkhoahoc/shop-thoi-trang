import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { Cart_Detail } from './Cart_Detail';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customer_id: string;

  @Column()
  total_product_value: number;

  @Column({ default: 0 })
  count_product: number;

  @CreateDateColumn({ type: 'timestamp' })
  create_time: Date;
  details: Cart_Detail[]

}