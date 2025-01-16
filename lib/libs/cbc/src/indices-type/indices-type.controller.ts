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
import { IndicesTypeService } from './indices-type.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('indices-type')
export class IndicesTypeController {
  constructor(
    @Inject(forwardRef(() => IndicesTypeService))
    private readonly indicesTypeService: IndicesTypeService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.indicesTypeService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.indicesTypeService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.indicesTypeService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.indicesTypeService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.indicesTypeService.delete(data);
  }
}
