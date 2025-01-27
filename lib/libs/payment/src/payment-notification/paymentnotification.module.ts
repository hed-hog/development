import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { GatewayModule } from '../gateway/gateway.module';
import { PaymentNotificationController } from './paymentnotification.controller';
import { PaymentNotificationService } from './paymentnotification.service';

@Module({
  imports: [
    forwardRef(() => PrismaModule),
    forwardRef(() => GatewayModule),
    forwardRef(() => PaginationModule),
  ],
  controllers: [PaymentNotificationController],
  providers: [PaymentNotificationService],
})
export class PaymentNotificationModule {}
