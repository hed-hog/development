import { AdminModule } from '@hedhog/admin';
import { ContactModule } from '@hedhog/contact';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { SettingModule } from '@hedhog/setting';
import { HttpModule } from '@nestjs/axios';
import { forwardRef, Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PaymentCouponModule } from '../payment-coupon/payment-coupon.module';
import { PaymentModule } from '../payment/payment.module';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';

@Module({
  imports: [
    EventEmitterModule.forRoot({
      global: true,
    }),
    HttpModule,
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
    forwardRef(() => PaymentModule),
    forwardRef(() => PaymentCouponModule),
    forwardRef(() => SettingModule),
    forwardRef(() => ContactModule),
  ],
  controllers: [CheckoutController],
  providers: [CheckoutService],
  exports: [CheckoutService],
})
export class CheckoutModule {}
