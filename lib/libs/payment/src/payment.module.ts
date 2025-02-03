import { AdminModule } from '@hedhog/admin';
import { ContactModule } from '@hedhog/contact';
import { LocaleModule } from '@hedhog/locale';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { CheckoutModule } from './checkout/checkout.module';
import { DiscountTypeModule } from './discount-type/discount-type.module';
import { ItemModule } from './item/item.module';
import { PaymentCardBrandModule } from './payment-card-brand/payment-card-brand.module';
import { PaymentCouponModule } from './payment-coupon/payment-coupon.module';
import { PaymentGatewayModule } from './payment-gateway/payment-gateway.module';
import { PaymentMethodItemModule } from './payment-method-item/payment-method-item.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { PaymentStatusModule } from './payment-status/payment-status.module';
import { PaymentModule as PaymentModule2 } from './payment/payment.module';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => LocaleModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
    forwardRef(() => PaymentStatusModule),
    forwardRef(() => CheckoutModule),
    forwardRef(() => PaymentMethodModule),
    forwardRef(() => DiscountTypeModule),
    forwardRef(() => PaymentModule2),
    forwardRef(() => ItemModule),
    forwardRef(() => PaymentMethodItemModule),
    forwardRef(() => PaymentGatewayModule),
    forwardRef(() => PaymentCardBrandModule),
    forwardRef(() => PaymentCouponModule),
    forwardRef(() => ContactModule),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class PaymentModule {}
