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
import { PaymentNotificationService } from './payment-notification.service';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { DeleteDTO } from '@hedhog/core';

@Role()
@Controller('payment/:paymentId/payment-notification')
export class PaymentNotificationController {
  constructor(
    @Inject(forwardRef(() => PaymentNotificationService))
    private readonly paymentNotificationService: PaymentNotificationService
  ) {}

  @Post()
  create(
    @Param('paymentId', ParseIntPipe) paymentId: number,
    @Body() data: CreateDTO
  ) {
    return this.paymentNotificationService.create(paymentId, data);
  }

  @Get()
  list(
    @Param('paymentId', ParseIntPipe) paymentId: number,
    @Pagination() paginationParams
  ) {
    return this.paymentNotificationService.list(paginationParams, paymentId);
  }

  @Get(':id')
  get(
    @Param('paymentId', ParseIntPipe) paymentId: number,
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.paymentNotificationService.get(paymentId, id);
  }

  @Patch(':id')
  update(
    @Param('paymentId', ParseIntPipe) paymentId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateDTO
  ) {
    return this.paymentNotificationService.update(paymentId, id, data);
  }

  @Delete()
  delete(
    @Param('paymentId', ParseIntPipe) paymentId: number,
    @Body() { ids }: DeleteDTO
  ) {
    return this.paymentNotificationService.delete(paymentId, { ids });
  }
}
