import { AdminModule } from '@hedhog/admin';
import { LocaleModule } from '@hedhog/locale';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { CheckoutModule } from './checkout/checkout.module';
import { GatewayModule } from './gateway/gateway.module';
import { PaymentStatusModule } from './payment-status/payment-status.module';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => LocaleModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
    forwardRef(() => GatewayModule),
    forwardRef(() => PaymentStatusModule),
    forwardRef(() => CheckoutModule),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class PaymentModule {}
