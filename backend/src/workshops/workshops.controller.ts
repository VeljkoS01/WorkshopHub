import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import type { WorkshopEntity } from './workshop.entity.js';
import { WorkshopsService } from './workshops.service.js';

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
}