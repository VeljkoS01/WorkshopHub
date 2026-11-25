import { config } from 'dotenv';
import { resolve } from 'node:path';
import { DataSource } from 'typeorm';

import { WorkshopEntity } from '../workshops/workshop.entity.js';
import { UserEntity } from '../users/user.entity.js';

config({ path: resolve(process.cwd(), '../.env') });

export default new DataSource({
    type: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    username: process.env['POSTGRES_USER'],
    password: process.env['POSTGRES_PASSWORD'],
    database: process.env['POSTGRES_DB'],
    entities: [WorkshopEntity, UserEntity],
    migrations: ['src/database/migrations/*.ts'],
    synchronize: false
});