import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import type { CreateWorkshopDto } from './dto/create-workshop.dto.js';

import { WorkshopEntity } from './workshop.entity.js';

@Injectable()
export class WorkshopsService {

    constructor(
        @InjectRepository(WorkshopEntity)
        private readonly workshopsRepository: Repository<WorkshopEntity>
    ) {}

    findAll(): Promise<WorkshopEntity[]> {
        return this.workshopsRepository.find();
    }

    async findOneBy(id: number): Promise<WorkshopEntity> {
        const workshop = await this.workshopsRepository.findOneBy({ id });

        if (!workshop) {
            throw new NotFoundException(`Workshop with id ${id} not found`);
        }
            return workshop;
    }

    create(dto: CreateWorkshopDto): Promise<WorkshopEntity> {
        const workshop = this.workshopsRepository.create({
            ...dto,
            enrolled: 0
        });

        return this.workshopsRepository.save(workshop);
    }
}