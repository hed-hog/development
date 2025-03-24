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
  forwardRef,
} from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { DashboardItemService } from './dashboard-item.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('dashboard-item')
export class DashboardItemController {
  constructor(
    @Inject(forwardRef(() => DashboardItemService))
    private readonly dashboardItemService: DashboardItemService,
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.dashboardItemService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.dashboardItemService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.dashboardItemService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.dashboardItemService.update({
      id,
      data,
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.dashboardItemService.delete(data);
  }
}
