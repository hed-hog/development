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
import { OrderService } from './order.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('order')
export class OrderController {
  constructor(
    @Inject(forwardRef(() => OrderService))
    private readonly orderService: OrderService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.orderService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.orderService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.orderService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.orderService.delete(data);
  }
}
