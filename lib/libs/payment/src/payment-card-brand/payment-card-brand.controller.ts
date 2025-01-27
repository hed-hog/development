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
import { PaymentCardBrandService } from './payment-card-brand.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('payment-card-brand')
export class PaymentCardBrandController {
  constructor(
    @Inject(forwardRef(() => PaymentCardBrandService))
    private readonly paymentCardBrandService: PaymentCardBrandService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.paymentCardBrandService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.paymentCardBrandService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.paymentCardBrandService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.paymentCardBrandService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.paymentCardBrandService.delete(data);
  }
}
