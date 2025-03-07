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
import { DashboardComponentService } from './dashboard-component.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('dashboard-component')
export class DashboardComponentController {
  constructor(
    @Inject(forwardRef(() => DashboardComponentService))
    private readonly dashboardComponentService: DashboardComponentService
  ) {}

  @Get()
  async list(@Locale() locale, @Pagination() paginationParams) {
    return this.dashboardComponentService.list(locale, paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.dashboardComponentService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.dashboardComponentService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.dashboardComponentService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.dashboardComponentService.delete(data);
  }
}
