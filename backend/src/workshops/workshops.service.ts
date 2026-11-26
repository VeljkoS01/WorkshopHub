import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import type { CreateWorkshopDto } from './dto/create-workshop.dto.js';
import type { UpdateWorkshopDto } from './dto/update-workshop.dto.js';
import { CategoriesService } from '../categories/categories.service.js';

import { WorkshopEntity } from './workshop.entity.js';

@Injectable()
export class WorkshopsService {

    constructor(
        @InjectRepository(WorkshopEntity)
        private readonly workshopsRepository: Repository<WorkshopEntity>,
        private readonly categoriesService: CategoriesService
    ) {}

    findAll(): Promise<WorkshopEntity[]> {
        return this.workshopsRepository.find({
            relations: {
                category: true
            }
        });
    }

    async findOneBy(id: number): Promise<WorkshopEntity> {
        const workshop = await this.workshopsRepository.findOne({
            where: { id },
            relations: {
                category: true
            }
        });

        if (!workshop) {
            throw new NotFoundException(`Workshop with id ${id} not found`);
        }

        return workshop;
    }

    async create(dto: CreateWorkshopDto): Promise<WorkshopEntity> {
        const category = await this.categoriesService.findOneBy(dto.categoryId);

        const workshop = this.workshopsRepository.create({
            ...dto,
            category,
            enrolled: 0
        });

        return this.workshopsRepository.save(workshop);
    }

    async update(id: number, dto: UpdateWorkshopDto): Promise<WorkshopEntity> {
        const workshop = await this.findOneBy(id);

        if (dto.capacity !== undefined && dto.capacity < workshop.enrolled) {
            throw new BadRequestException(
                'Capacity cannot be lower than the number of enrolled participants'
            );
        }

        if (dto.categoryId !== undefined) {
            workshop.category = await this.categoriesService.findOneBy(dto.categoryId);
        }

        Object.assign(workshop, dto);

        return this.workshopsRepository.save(workshop);
    }

    async remove(id: number): Promise<void> {
        const result = await this.workshopsRepository.delete(id);
        if (!result.affected) {
            throw new NotFoundException(`Workshop with id ${id} not found`);
        }
    }
}