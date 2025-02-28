import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { Module, forwardRef } from '@nestjs/common';
import { SubscriptionCreateController } from './subscription-create.controller';
import { SubscriptionCreateService } from './subscription-create.service';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
  controllers: [SubscriptionCreateController],
  providers: [SubscriptionCreateService],
  exports: [SubscriptionCreateService],
})
export class SubscriptionCreateModule {}
