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
import { EventTypeService } from './event-type.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('event-type')
export class EventTypeController {
  constructor(
    @Inject(forwardRef(() => EventTypeService))
    private readonly eventTypeService: EventTypeService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.eventTypeService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.eventTypeService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.eventTypeService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.eventTypeService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.eventTypeService.delete(data);
  }
}
