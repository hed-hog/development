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
import { PaymentValueService } from './payment-value.service';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { DeleteDTO } from '@hedhog/core';

@Role()
@Controller('payment/:paymentId/payment-value')
export class PaymentValueController {
  constructor(
    @Inject(forwardRef(() => PaymentValueService))
    private readonly paymentValueService: PaymentValueService
  ) {}

  @Post()
  create(
    @Param('paymentId', ParseIntPipe) paymentId: number,
    @Body() data: CreateDTO
  ) {
    return this.paymentValueService.create(paymentId, data);
  }

  @Get()
  list(
    @Param('paymentId', ParseIntPipe) paymentId: number,
    @Pagination() paginationParams
  ) {
    return this.paymentValueService.list(paginationParams, paymentId);
  }

  @Get(':id')
  get(
    @Param('paymentId', ParseIntPipe) paymentId: number,
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.paymentValueService.get(paymentId, id);
  }

  @Patch(':id')
  update(
    @Param('paymentId', ParseIntPipe) paymentId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateDTO
  ) {
    return this.paymentValueService.update(paymentId, id, data);
  }

  @Delete()
  delete(
    @Param('paymentId', ParseIntPipe) paymentId: number,
    @Body() { ids }: DeleteDTO
  ) {
    return this.paymentValueService.delete(paymentId, { ids });
  }
}
