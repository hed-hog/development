import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { SubscriptionPlanItemService } from './subscription-plan-item.service';
import { SubscriptionPlanItemController } from './subscription-plan-item.controller';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule)
  ],
  controllers: [SubscriptionPlanItemController],
  providers: [SubscriptionPlanItemService],
  exports: [SubscriptionPlanItemService]
})
export class SubscriptionPlanItemModule {}
