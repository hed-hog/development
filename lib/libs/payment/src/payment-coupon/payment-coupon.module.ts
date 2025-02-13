import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { PaymentCouponService } from './payment-coupon.service';
import { PaymentCouponController } from './payment-coupon.controller';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule)
  ],
  controllers: [PaymentCouponController],
  providers: [PaymentCouponService],
  exports: [PaymentCouponService]
})
export class PaymentCouponModule {}
