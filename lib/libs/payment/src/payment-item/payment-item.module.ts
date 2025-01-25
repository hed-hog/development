import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { PaymentItemService } from './payment-item.service';
import { PaymentItemController } from './payment-item.controller';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule)
  ],
  controllers: [PaymentItemController],
  providers: [PaymentItemService],
  exports: [PaymentItemService]
})
export class PaymentItemModule {}
