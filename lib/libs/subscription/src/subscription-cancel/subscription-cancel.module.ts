import { AdminModule } from '@hedhog/admin';
import { LocaleModule } from '@hedhog/locale';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { SubscriptionCancelController } from './subscription-cancel.controller';
import { SubscriptionCancelService } from './subscription-cancel.service';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => LocaleModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
  controllers: [SubscriptionCancelController],
  providers: [SubscriptionCancelService],
  exports: [SubscriptionCancelService],
})
export class SubscriptionCancelModule {}
