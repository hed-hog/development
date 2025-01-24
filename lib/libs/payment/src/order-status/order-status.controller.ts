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
import { OrderStatusService } from './order-status.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('order-status')
export class OrderStatusController {
  constructor(
    @Inject(forwardRef(() => OrderStatusService))
    private readonly orderStatusService: OrderStatusService
  ) {}

  @Get()
  async list(@Locale() locale, @Pagination() paginationParams) {
    return this.orderStatusService.list(locale, paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.orderStatusService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.orderStatusService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.orderStatusService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.orderStatusService.delete(data);
  }
}
