import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Order_Detail } from './Order_Detail';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  address: string;

  @Column()
  customer_phone_number: string;

  @Column()
  note: string;

  @Column()
  customer_name: string;

  @Column()
  customer_id: number;

  @Column()
  total_product_value: number;

  @Column()
  voucher_id: number;

  @Column()
  voucher_discount_value: number;

  @Column()
  total_amount: number;

  @Column()
  status: string;

  @Column()
  payment_status: string;

  @Column()
  payment_method: string;

  @CreateDateColumn({ type: 'timestamp' })
  create_time: Date;

  // set relationship with Order_Detail
  @OneToMany(() => Order_Detail, orderDetail => orderDetail.order)
  details: Order_Detail[];
}

