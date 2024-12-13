import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { TrendTypeService } from './trend-type.service';
import { TrendTypeController } from './trend-type.controller';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule)
  ],
  controllers: [TrendTypeController],
  providers: [TrendTypeService],
  exports: [TrendTypeService]
})
export class TrendTypeModule {}
