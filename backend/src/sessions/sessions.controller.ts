import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post
} from '@nestjs/common';

import { SessionsService } from './sessions.service.js';
import { CreateSessionDto } from './dto/create-session.dto.js';
import type { SessionEntity } from './session.entity.js';

@Controller('workshops/:workshopId/sessions')
export class SessionsController {

    constructor(
        private readonly sessionsService: SessionsService
    ) {}

    @Get()
    findAll(@Param('workshopId', ParseIntPipe) workshopId: number): Promise<SessionEntity[]> {
        return this.sessionsService.findAll(workshopId);
    }

    @Get(':id')
    findOneBy(
        @Param('workshopId', ParseIntPipe) workshopId: number,
        @Param('id', ParseIntPipe) id: number
    ): Promise<SessionEntity> {
        return this.sessionsService.findOne(workshopId, id);
    }

    @Post()
    create(@Param('workshopId', ParseIntPipe) workshopId: number, @Body() dto: CreateSessionDto): Promise<SessionEntity> {
        return this.sessionsService.create(workshopId, dto);
    }
}