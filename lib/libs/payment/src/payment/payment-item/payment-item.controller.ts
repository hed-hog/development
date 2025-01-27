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
import { PaymentItemService } from './payment-item.service';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { DeleteDTO } from '@hedhog/core';

@Role()
@Controller('payment/:paymentId/payment-item')
export class PaymentItemController {
  constructor(
    @Inject(forwardRef(() => PaymentItemService))
    private readonly paymentItemService: PaymentItemService
  ) {}

  @Post()
  create(
    @Param('paymentId', ParseIntPipe) paymentId: number,
    @Body() data: CreateDTO
  ) {
    return this.paymentItemService.create(paymentId, data);
  }

  @Get()
  list(
    @Param('paymentId', ParseIntPipe) paymentId: number,
    @Pagination() paginationParams
  ) {
    return this.paymentItemService.list(paginationParams, paymentId);
  }

  @Get(':id')
  get(
    @Param('paymentId', ParseIntPipe) paymentId: number,
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.paymentItemService.get(paymentId, id);
  }

  @Patch(':id')
  update(
    @Param('paymentId', ParseIntPipe) paymentId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateDTO
  ) {
    return this.paymentItemService.update(paymentId, id, data);
  }

  @Delete()
  delete(
    @Param('paymentId', ParseIntPipe) paymentId: number,
    @Body() { ids }: DeleteDTO
  ) {
    return this.paymentItemService.delete(paymentId, { ids });
  }
}
