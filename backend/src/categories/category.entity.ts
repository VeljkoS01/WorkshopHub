import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique
} from 'typeorm';

import type { Relation } from 'typeorm';
import { WorkshopEntity } from '../workshops/workshop.entity.js';

@Entity('categories')
@Unique('UQ_categories_name', ['name'])
export class CategoryEntity {

    @PrimaryGeneratedColumn({
        primaryKeyConstraintName: 'PK_categories_id'
    })
    id!: number;

    @Column({ type: 'varchar', length: 30 })
    name!: string;

    @OneToMany(() => WorkshopEntity, workshop => workshop.category)
    workshops!: Relation<WorkshopEntity[]>;
}