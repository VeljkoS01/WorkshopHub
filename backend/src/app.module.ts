import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { WorkshopsModule } from './workshops/workshops.module.js';
import { UsersModule } from './users/users.module.js';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '../.env'
        }),

        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                type: 'postgres',
                host: '127.0.0.1',
                port: 5432,
                username: config.getOrThrow<string>('POSTGRES_USER'),
                password: config.getOrThrow<string>('POSTGRES_PASSWORD'),
                database: config.getOrThrow<string>('POSTGRES_DB'),
                autoLoadEntities: true,
                synchronize: false
            })
        }),

        WorkshopsModule,

        UsersModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}