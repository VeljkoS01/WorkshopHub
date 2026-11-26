import {
    Check,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';

import type { Relation } from 'typeorm';
import { CategoryEntity } from '../categories/category.entity.js';

@Entity('workshops')
@Check('CHK_workshops_capacity', '"capacity" >= 1')
@Check('CHK_workshops_enrolled', '"enrolled" >= 0 AND "enrolled" <= "capacity"')
export class WorkshopEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 150 })
    title!: string;

    @Column({ type: 'int' })
    categoryId!: number;

    @ManyToOne(() => CategoryEntity, category => category.workshops, {
        nullable: false,
        onDelete: 'RESTRICT'
    })
    @JoinColumn({
        name: 'categoryId',
        foreignKeyConstraintName: 'FK_workshops_category'
    })
    category!: Relation<CategoryEntity>;

    @Column({ type: 'int' })
    capacity!: number;

    @Column({ type: 'int', default: 0 })
    enrolled!: number;

    @Column({ type: 'text' })
    description!: string;
}