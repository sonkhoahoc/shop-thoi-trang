import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Asset_Image {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    asset_url: string //đường dẫn ảnh

    @Column()
    type: string //phần biệt loại ảnh

    @CreateDateColumn({ type: 'timestamp' })
    date_added: Date;
}