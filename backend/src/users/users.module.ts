import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './user.entity.js';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])]
})
export class UsersModule {}