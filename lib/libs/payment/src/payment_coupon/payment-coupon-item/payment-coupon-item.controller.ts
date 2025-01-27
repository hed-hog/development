import { Pagination } from '@hedhog/pagination';
import { Role } from '@hedhog/core';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Inject,
  forwardRef
} from '@nestjs/common';
import { PaymentCouponItemService } from './payment-coupon-item.service';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { DeleteDTO } from '@hedhog/core';

@Role()
@Controller('payment-coupon/:couponId/payment-coupon-item')
export class PaymentCouponItemController {
  constructor(
    @Inject(forwardRef(() => PaymentCouponItemService))
    private readonly paymentCouponItemService: PaymentCouponItemService
  ) {}

  @Post()
  create(
    @Param('couponId', ParseIntPipe) couponId: number,
    @Body() data: CreateDTO
  ) {
    return this.paymentCouponItemService.create(couponId, data);
  }

  @Get()
  list(
    @Param('couponId', ParseIntPipe) couponId: number,
    @Pagination() paginationParams
  ) {
    return this.paymentCouponItemService.list(paginationParams, couponId);
  }

  @Get(':id')
  get(
    @Param('couponId', ParseIntPipe) couponId: number,
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.paymentCouponItemService.get(couponId, id);
  }

  @Patch(':id')
  update(
    @Param('couponId', ParseIntPipe) couponId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateDTO
  ) {
    return this.paymentCouponItemService.update(couponId, id, data);
  }

  @Delete()
  delete(
    @Param('couponId', ParseIntPipe) couponId: number,
    @Body() { ids }: DeleteDTO
  ) {
    return this.paymentCouponItemService.delete(couponId, { ids });
  }
}
