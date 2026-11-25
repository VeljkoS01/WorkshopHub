import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm';

import { UserRole } from './user-role.enum.js';

@Entity('users')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 100 })
    name!: string;

    @Column({ type: 'varchar', length: 254, unique: true })
    email!: string;

    @Column({ type: 'varchar', length: 255, select: false })
    passwordHash!: string;

    @Column({ type: 'enum', enum: UserRole, enumName: 'user_role', default: UserRole.STUDENT })
    role!: UserRole;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt!: Date;

    @Column({ type: 'boolean', default: true })
    isActive!: boolean;
}