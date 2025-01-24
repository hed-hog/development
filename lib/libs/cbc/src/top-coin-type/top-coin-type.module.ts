import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { TopCoinTypeService } from './top-coin-type.service';
import { TopCoinTypeController } from './top-coin-type.controller';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule)
  ],
  controllers: [TopCoinTypeController],
  providers: [TopCoinTypeService],
  exports: [TopCoinTypeService]
})
export class TopCoinTypeModule {}
