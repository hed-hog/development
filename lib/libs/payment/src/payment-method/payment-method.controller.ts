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
import { PaymentMethodService } from './payment-method.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('payment-method')
export class PaymentMethodController {
  constructor(
    @Inject(forwardRef(() => PaymentMethodService))
    private readonly paymentMethodService: PaymentMethodService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.paymentMethodService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.paymentMethodService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.paymentMethodService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.paymentMethodService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.paymentMethodService.delete(data);
  }
}
