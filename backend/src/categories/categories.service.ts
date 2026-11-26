import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';

import { CategoryEntity } from './category.entity.js';

@Injectable()
export class CategoriesService {

    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoriesRepository: Repository<CategoryEntity>
    ) {}

    findAll(): Promise<CategoryEntity[]> {
        return this.categoriesRepository.find({
            order: { name: 'ASC' }
        });
    }

    async findOneBy(id: number): Promise<CategoryEntity> {
        const category = await this.categoriesRepository.findOneBy({ id });

        if (!category) {
            throw new NotFoundException(`Category with id ${id} not found`);
        }

        return category;
    }
}