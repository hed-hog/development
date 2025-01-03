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
import { GlobalMetricsService } from './global-metrics.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('global-metrics')
export class GlobalMetricsController {
  constructor(
    @Inject(forwardRef(() => GlobalMetricsService))
    private readonly globalMetricsService: GlobalMetricsService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.globalMetricsService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.globalMetricsService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.globalMetricsService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.globalMetricsService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.globalMetricsService.delete(data);
  }
}
