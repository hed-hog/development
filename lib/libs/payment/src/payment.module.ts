import { PaymentStatusModule } from './payment-status/payment-status.module';
import { OrderModule } from './order/order.module';
import { OrderStatusModule } from './order-status/order-status.module';
import { GatewayModule } from './gateway/gateway.module';
import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
    forwardRef(() => GatewayModule),
    forwardRef(() => OrderStatusModule),
    forwardRef(() => OrderModule),
    forwardRef(() => PaymentStatusModule),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class PaymentModule {}
