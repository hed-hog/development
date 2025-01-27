import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { PaymentMethodItemService } from './payment-method-item.service';
import { PaymentMethodItemController } from './payment-method-item.controller';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule)
  ],
  controllers: [PaymentMethodItemController],
  providers: [PaymentMethodItemService],
  exports: [PaymentMethodItemService]
})
export class PaymentMethodItemModule {}
