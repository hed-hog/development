import { DeleteDTO, Role } from '@hedhog/core';
import { Pagination } from '@hedhog/pagination';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  forwardRef,
} from '@nestjs/common';
import { PaymentGatewayService } from '../payment-gateway/payment-gateway.service';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { PaymentNotificationService } from './payment-notification.service';

@Role()
@Controller('payment-notification')
export class PaymentNotificationController {
  constructor(
    @Inject(forwardRef(() => PaymentNotificationService))
    private readonly paymentNotificationService: PaymentNotificationService,
    @Inject(forwardRef(() => PaymentGatewayService))
    private readonly paymentGatewayService: PaymentGatewayService,
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.paymentNotificationService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.paymentNotificationService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.paymentNotificationService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.paymentNotificationService.update({
      id,
      data,
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.paymentNotificationService.delete(data);
  }

  @Post(':gatewayId')
  async notification(
    @Param('gatewayId', ParseIntPipe) gatewayId: number,
    @Body() body,
  ) {
    const gateway = await this.paymentGatewayService.get(gatewayId);

    if (!gateway) {
      throw new BadRequestException('Gateway not found');
    }

    const notification = await this.paymentNotificationService.create({
      gateway_id: gatewayId,
      log: JSON.stringify(body),
    });

    return { success: true, notification };
  }
}
