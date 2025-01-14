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
import { Top100Service } from './top-100.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('top-100')
export class Top100Controller {
  constructor(
    @Inject(forwardRef(() => Top100Service))
    private readonly top100Service: Top100Service
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.top100Service.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.top100Service.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.top100Service.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.top100Service.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.top100Service.delete(data);
  }
}
