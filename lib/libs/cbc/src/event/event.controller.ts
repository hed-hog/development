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
import { EventService } from './event.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('event')
export class EventController {
  constructor(
    @Inject(forwardRef(() => EventService))
    private readonly eventService: EventService
  ) {}

  @Get()
  async list(@Locale() locale, @Pagination() paginationParams) {
    return this.eventService.list(locale, paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.eventService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.eventService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.eventService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.eventService.delete(data);
  }
}
