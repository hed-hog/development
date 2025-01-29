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
import { SubscriptionPaymentService } from './subscription-payment.service';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { DeleteDTO } from '@hedhog/core';

@Role()
@Controller('subscription/:subscriptionId/subscription-payment')
export class SubscriptionPaymentController {
  constructor(
    @Inject(forwardRef(() => SubscriptionPaymentService))
    private readonly subscriptionPaymentService: SubscriptionPaymentService
  ) {}

  @Post()
  create(
    @Param('subscriptionId', ParseIntPipe) subscriptionId: number,
    @Body() data: CreateDTO
  ) {
    return this.subscriptionPaymentService.create(subscriptionId, data);
  }

  @Get()
  list(
    @Param('subscriptionId', ParseIntPipe) subscriptionId: number,
    @Pagination() paginationParams
  ) {
    return this.subscriptionPaymentService.list(
      paginationParams,
      subscriptionId
    );
  }

  @Get(':id')
  get(
    @Param('subscriptionId', ParseIntPipe) subscriptionId: number,
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.subscriptionPaymentService.get(subscriptionId, id);
  }

  @Patch(':id')
  update(
    @Param('subscriptionId', ParseIntPipe) subscriptionId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateDTO
  ) {
    return this.subscriptionPaymentService.update(subscriptionId, id, data);
  }

  @Delete()
  delete(
    @Param('subscriptionId', ParseIntPipe) subscriptionId: number,
    @Body() { ids }: DeleteDTO
  ) {
    return this.subscriptionPaymentService.delete(subscriptionId, { ids });
  }
}
