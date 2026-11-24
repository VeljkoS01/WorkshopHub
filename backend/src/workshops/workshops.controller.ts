import { Controller, Get, Post, Body, Param, ParseIntPipe, Patch, Delete, HttpCode } from '@nestjs/common';

import { CreateWorkshopDto } from './dto/create-workshop.dto.js';
import { UpdateWorkshopDto } from './dto/update-workshop.dto.js';
import { WorkshopsService } from './workshops.service.js';

import type { WorkshopEntity } from './workshop.entity.js';

@Controller('workshops')
export class WorkshopsController {

    constructor(private readonly workshopsService: WorkshopsService) {}

    @Get()
    findAll(): Promise<WorkshopEntity[]> {
        return this.workshopsService.findAll();
    }

    @Get(':id')
    findOneBy(@Param('id', ParseIntPipe) id: number): Promise<WorkshopEntity> {
        return this.workshopsService.findOneBy(id);
    }

    @Post()
    create(@Body() dto: CreateWorkshopDto): Promise<WorkshopEntity> {
        return this.workshopsService.create(dto);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateWorkshopDto
    ): Promise<WorkshopEntity> {
        return this.workshopsService.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.workshopsService.remove(id);
    }
}