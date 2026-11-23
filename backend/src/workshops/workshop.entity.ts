import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('workshops')
export class WorkshopEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 150 })
    title!: string;

    @Column({ type: 'varchar', length: 30 })
    category!: string;

    @Column({ type: 'int' })
    capacity!: number;

    @Column({ type: 'int', default: 0 })
    enrolled!: number;

    @Column({ type: 'text' })
    description!: string;
}