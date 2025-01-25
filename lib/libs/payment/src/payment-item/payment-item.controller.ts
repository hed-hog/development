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
import { PaymentItemService } from './payment-item.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('payment-item')
export class PaymentItemController {
  constructor(
    @Inject(forwardRef(() => PaymentItemService))
    private readonly paymentItemService: PaymentItemService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.paymentItemService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.paymentItemService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.paymentItemService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.paymentItemService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.paymentItemService.delete(data);
  }
}
