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
import { PaymentCouponService } from './payment-coupon.service';
import { Role, DeleteDTO } from '@hedhog/core';

@Role()
@Controller('payment-coupon')
export class PaymentCouponController {
  constructor(
    @Inject(forwardRef(() => PaymentCouponService))
    private readonly paymentCouponService: PaymentCouponService
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.paymentCouponService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.paymentCouponService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.paymentCouponService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.paymentCouponService.update({
      id,
      data
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.paymentCouponService.delete(data);
  }
}
