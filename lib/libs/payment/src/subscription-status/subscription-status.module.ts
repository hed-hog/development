import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { SubscriptionStatusService } from './subscription-status.service';
import { SubscriptionStatusController } from './subscription-status.controller';
@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
  controllers: [SubscriptionStatusController],
  providers: [SubscriptionStatusService],
  exports: [SubscriptionStatusService],
})
export class SubscriptionStatusModule {}
