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
import { ComponentPropService } from './component-prop.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('component-prop')
export class ComponentPropController {
  constructor(
    @Inject(forwardRef(() => ComponentPropService))
    private readonly componentPropService: ComponentPropService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.componentPropService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.componentPropService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.componentPropService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.componentPropService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.componentPropService.delete(data);
  }
}
