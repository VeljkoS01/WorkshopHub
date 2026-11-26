import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, LessThan, MoreThan } from 'typeorm';
import type { Repository } from 'typeorm';

import { SessionEntity } from './session.entity.js';
import { WorkshopEntity } from '../workshops/workshop.entity.js';
import type { CreateSessionDto } from './dto/create-session.dto.js';

@Injectable()
export class SessionsService {

    constructor(
        @InjectRepository(SessionEntity)
        private readonly sessionsRepository: Repository<SessionEntity>,
        private readonly dataSource: DataSource
    ) {}

    async findAll(workshopId: number): Promise<SessionEntity[]> {

        const workshop = await this.dataSource
            .getRepository(WorkshopEntity)
            .findOneBy({ id: workshopId });

        if (!workshop) {
            throw new NotFoundException(
                `Workshop with id ${workshopId} not found`
            );
        }

        return this.sessionsRepository.find({
            where: { workshopId },
            order: { startsAt: 'ASC' }
        });
    }

    async findOne(workshopId: number, id: number): Promise<SessionEntity> {
        const session = await this.sessionsRepository.findOne({
            where: { id, workshopId }
        });

        if (!session) {
            throw new NotFoundException(
                `Session with id ${id} not found`
            );
        }

        return session;
    }

    async create(
        workshopId: number,
        dto: CreateSessionDto
    ): Promise<SessionEntity> {

        const startsAt = new Date(dto.startsAt);
        const endsAt = new Date(dto.endsAt);

        if (
            Number.isNaN(startsAt.getTime()) ||
            Number.isNaN(endsAt.getTime()) ||
            startsAt.getTime() >= endsAt.getTime()
        ) {
            throw new BadRequestException(
                'Session end must be after session start'
            );
        }

        return this.dataSource.transaction('READ COMMITTED', async manager => {

            const workshop = await manager.findOne(WorkshopEntity, {
                where: { id: workshopId },
                lock: { mode: 'pessimistic_write' }
            });

            if (!workshop) {
                throw new NotFoundException(
                    `Workshop with id ${workshopId} not found`
                );
            }

            const repository = manager.getRepository(SessionEntity);

            const overlappingSession = await repository.findOneBy({
                workshopId,
                startsAt: LessThan(endsAt),
                endsAt: MoreThan(startsAt)
            });

            if (overlappingSession) {
                throw new ConflictException(
                    'Session overlaps with an existing session'
                );
            }

            const session = repository.create({
                title: dto.title,
                workshopId,
                startsAt,
                endsAt
            });

            return repository.save(session);
        });
    }
}