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
import { PaymentMethodItemService } from './payment-method-item.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('payment-method-item')
export class PaymentMethodItemController {
  constructor(
    @Inject(forwardRef(() => PaymentMethodItemService))
    private readonly paymentMethodItemService: PaymentMethodItemService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.paymentMethodItemService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.paymentMethodItemService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.paymentMethodItemService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.paymentMethodItemService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.paymentMethodItemService.delete(data);
  }
}
