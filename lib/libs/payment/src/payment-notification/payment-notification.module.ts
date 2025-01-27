import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { PaymentGatewayModule } from '../payment-gateway/payment-gateway.module';
import { PaymentNotificationController } from './payment-notification.controller';
import { PaymentNotificationService } from './payment-notification.service';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
    forwardRef(() => PaymentGatewayModule),
  ],
  controllers: [PaymentNotificationController],
  providers: [PaymentNotificationService],
  exports: [PaymentNotificationService],
})
export class PaymentNotificationModule {}
