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
import { DashboardUserService } from './dashboard-user.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('dashboard-user')
export class DashboardUserController {
  constructor(
    @Inject(forwardRef(() => DashboardUserService))
    private readonly dashboardUserService: DashboardUserService,
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.dashboardUserService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.dashboardUserService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.dashboardUserService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.dashboardUserService.update({
      id,
      data,
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.dashboardUserService.delete(data);
  }
}
