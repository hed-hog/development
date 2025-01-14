import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { FreeBalanceConditionService } from './free-balance-condition.service';
import { FreeBalanceConditionController } from './free-balance-condition.controller';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule)
  ],
  controllers: [FreeBalanceConditionController],
  providers: [FreeBalanceConditionService],
  exports: [FreeBalanceConditionService]
})
export class FreeBalanceConditionModule {}
