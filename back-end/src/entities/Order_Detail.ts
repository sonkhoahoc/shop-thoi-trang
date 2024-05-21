import { join } from 'path';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './Order';

@Entity()
export class Order_Detail {
  @PrimaryGeneratedColumn()
  id: number;

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

  // set relationship with Order
  @ManyToOne(() => Order, order => order.details)
  @JoinColumn({ name: 'orderId' })
  order: Order;

}
