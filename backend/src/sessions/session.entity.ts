import {
    Check,
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';

import type { Relation } from 'typeorm';
import { WorkshopEntity } from '../workshops/workshop.entity.js';

@Entity('sessions')
@Check('CHK_sessions_time', '"endsAt" > "startsAt"')
@Index('IDX_sessions_workshop_start', ['workshopId', 'startsAt'])
export class SessionEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 150 })
    title!: string;

    @Column({ type: 'int' })
    workshopId!: number;

    @ManyToOne(() => WorkshopEntity, workshop => workshop.sessions, {
        nullable: false,
        onDelete: 'CASCADE'
    })
    @JoinColumn({
        name: 'workshopId',
        foreignKeyConstraintName: 'FK_sessions_workshop'
    })
    workshop!: Relation<WorkshopEntity>;

    @Column({ type: 'timestamptz' })
    startsAt!: Date;

    @Column({ type: 'timestamptz' })
    endsAt!: Date;
}