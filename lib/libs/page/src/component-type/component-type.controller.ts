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
import { ComponentTypeService } from './component-type.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('component-type')
export class ComponentTypeController {
  constructor(
    @Inject(forwardRef(() => ComponentTypeService))
    private readonly componentTypeService: ComponentTypeService
  ) {}

  @Get()
  async list(@Locale() locale, @Pagination() paginationParams) {
    return this.componentTypeService.list(locale, paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.componentTypeService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.componentTypeService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.componentTypeService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.componentTypeService.delete(data);
  }
}
