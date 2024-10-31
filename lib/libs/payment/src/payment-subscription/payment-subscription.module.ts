import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { PaymentSubscriptionService } from './payment-subscription.service';
import { PaymentSubscriptionController } from './payment-subscription.controller';
@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
  controllers: [PaymentSubscriptionController],
  providers: [PaymentSubscriptionService],
  exports: [PaymentSubscriptionService],
})
export class PaymentSubscriptionModule {}
