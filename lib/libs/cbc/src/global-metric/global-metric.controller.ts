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
import { GlobalMetricService } from './global-metric.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('global-metric')
export class GlobalMetricController {
  constructor(
    @Inject(forwardRef(() => GlobalMetricService))
    private readonly globalMetricService: GlobalMetricService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.globalMetricService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.globalMetricService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.globalMetricService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.globalMetricService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.globalMetricService.delete(data);
  }
}
