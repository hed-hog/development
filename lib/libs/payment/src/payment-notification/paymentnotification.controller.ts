import {
  BadRequestException,
  Body,
  Controller,
  forwardRef,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { GatewayService } from '../gateway/gateway.service';
import { PaymentNotificationService } from './paymentnotification.service';

@Controller('payment-notification')
export class PaymentNotificationController {
  constructor(
    @Inject(forwardRef(() => GatewayService))
    private readonly gatewayService: GatewayService,
    @Inject(forwardRef(() => PaymentNotificationService))
    private readonly paymentNotificationService: PaymentNotificationService,
  ) {}

  @Post(':gatewayId')
  async notification(
    @Param('gatewayId', ParseIntPipe) gatewayId: number,
    @Body() body,
  ) {
    const gateway = await this.gatewayService.get(gatewayId);

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
