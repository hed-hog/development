import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { PaymentItemController } from './payment-item/payment-item.controller';
import { PaymentItemService } from './payment-item/payment-item.service';
import { PaymentValueController } from './payment-value/payment-value.controller';
import { PaymentValueService } from './payment-value/payment-value.service';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
  controllers: [
    PaymentItemController,
    PaymentValueController,
    PaymentController,
  ],
  providers: [PaymentItemService, PaymentValueService, PaymentService],
  exports: [forwardRef(() => PaymentService)],
})
export class PaymentModule {}
