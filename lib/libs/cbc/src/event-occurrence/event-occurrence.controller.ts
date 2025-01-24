import { Pagination } from '@hedhog/pagination';
import { Locale } from '@hedhog/locale';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  forwardRef
} from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { EventOccurrenceService } from './event-occurrence.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('event-occurrence')
export class EventOccurrenceController {
  constructor(
    @Inject(forwardRef(() => EventOccurrenceService))
    private readonly eventOccurrenceService: EventOccurrenceService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.eventOccurrenceService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.eventOccurrenceService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.eventOccurrenceService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.eventOccurrenceService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.eventOccurrenceService.delete(data);
  }
}
