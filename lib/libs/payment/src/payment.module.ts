import { AdminModule } from '@hedhog/admin';
import { LocaleModule } from '@hedhog/locale';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { CardBrandModule } from './card-brand/card-brand.module';
import { CheckoutModule } from './checkout/checkout.module';
import { DiscountTypeModule } from './discount-type/discount-type.module';
import { GatewayModule } from './gateway/gateway.module';
import { ItemModule } from './item/item.module';
import { PaymentItemModule } from './payment-item/payment-item.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { PaymentStatusModule } from './payment-status/payment-status.module';
import { PaymentModule as PaymentModule2 } from './payment/payment.module';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => LocaleModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
    forwardRef(() => GatewayModule),
    forwardRef(() => PaymentStatusModule),
    forwardRef(() => CheckoutModule),
    forwardRef(() => PaymentMethodModule),
    forwardRef(() => CardBrandModule),
    forwardRef(() => DiscountTypeModule),
    forwardRef(() => PaymentModule2),
    forwardRef(() => ItemModule),
    forwardRef(() => PaymentItemModule),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class PaymentModule {}
