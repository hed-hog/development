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
import { ComponentPropTypeService } from './component-prop-type.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('component-prop-type')
export class ComponentPropTypeController {
  constructor(
    @Inject(forwardRef(() => ComponentPropTypeService))
    private readonly componentPropTypeService: ComponentPropTypeService
  ) {}

  @Get()
  async list(@Locale() locale, @Pagination() paginationParams) {
    return this.componentPropTypeService.list(locale, paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.componentPropTypeService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.componentPropTypeService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.componentPropTypeService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.componentPropTypeService.delete(data);
  }
}
