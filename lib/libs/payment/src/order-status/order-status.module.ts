import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { OrderStatusService } from './order-status.service';
import { OrderStatusController } from './order-status.controller';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule)
  ],
  controllers: [OrderStatusController],
  providers: [OrderStatusService],
  exports: [OrderStatusService]
})
export class OrderStatusModule {}
