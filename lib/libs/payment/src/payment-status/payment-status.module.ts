import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { PaymentStatusService } from './payment-status.service';
import { PaymentStatusController } from './payment-status.controller';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule)
  ],
  controllers: [PaymentStatusController],
  providers: [PaymentStatusService],
  exports: [PaymentStatusService]
})
export class PaymentStatusModule {}
