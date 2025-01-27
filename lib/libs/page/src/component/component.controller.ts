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
import { ComponentService } from './component.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('component')
export class ComponentController {
  constructor(
    @Inject(forwardRef(() => ComponentService))
    private readonly componentService: ComponentService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.componentService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.componentService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.componentService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.componentService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.componentService.delete(data);
  }
}
