import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

const entities = join(__dirname, '**', '*.entity.{ts,js}');

const config: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: 3307,
    //port: parseInt(process.env.DB_PORT, 0) || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'strong_password',
    database: process.env.DB_NAME || 'Animalservice',
    entities: [entities],
    migrations: [],
    supportBigNumbers: true,
    bigNumberStrings: false,
    retryDelay: 60000,
    retryAttempts: 10,
    synchronize: true
};

export default config;
