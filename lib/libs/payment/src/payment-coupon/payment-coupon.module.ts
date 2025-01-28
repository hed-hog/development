import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { PaymentCouponItemController } from './payment-coupon-item/payment-coupon-item.controller';
import { PaymentCouponItemService } from './payment-coupon-item/payment-coupon-item.service';
import { PaymentCouponController } from './payment-coupon.controller';
import { PaymentCouponService } from './payment-coupon.service';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
  controllers: [PaymentCouponController, PaymentCouponItemController],
  providers: [PaymentCouponService, PaymentCouponItemService],
  exports: [PaymentCouponService],
})
export class PaymentCouponModule {}
