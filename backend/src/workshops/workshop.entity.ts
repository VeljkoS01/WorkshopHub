import { Check, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('workshops')
@Check('CHK_workshops_capacity', '"capacity" >= 1')
@Check('CHK_workshops_enrolled', '"enrolled" >= 0 AND "enrolled" <= "capacity"')
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