import { DataSource } from 'typeorm';

const orm_config = new DataSource({
    type:'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'phamvanson2001',
    database: 'shop-thoi-trang',
    entities: ["src/entities/*.ts"],
    logging: true,
    synchronize: true
})

export default orm_config;