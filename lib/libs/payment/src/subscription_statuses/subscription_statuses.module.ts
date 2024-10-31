import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { Subscription_statusesService } from './subscription_statuses.service';
import { Subscription_statusesController } from './subscription_statuses.controller';
@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
  controllers: [Subscription_statusesController],
  providers: [Subscription_statusesService],
  exports: [Subscription_statusesService],
})
export class Subscription_statusesModule {}
