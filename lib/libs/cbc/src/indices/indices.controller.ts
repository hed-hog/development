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
import { IndicesService } from './indices.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('indices')
export class IndicesController {
  constructor(
    @Inject(forwardRef(() => IndicesService))
    private readonly indicesService: IndicesService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.indicesService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.indicesService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.indicesService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.indicesService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.indicesService.delete(data);
  }
}
