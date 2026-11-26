import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service.js';
import type { CategoryEntity } from './category.entity.js';

@Controller('categories')
export class CategoriesController {

    constructor(private readonly categoriesService: CategoriesService) {}
    
    @Get()
    findAll(): Promise<CategoryEntity[]> {
        return this.categoriesService.findAll();
    }
    
    @Get(':id')
    findOneBy(@Param('id', ParseIntPipe) id: number): Promise<CategoryEntity> {
        return this.categoriesService.findOneBy(id);
    }
}
