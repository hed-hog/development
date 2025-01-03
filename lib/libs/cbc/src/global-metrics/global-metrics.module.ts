import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { GlobalMetricsService } from './global-metrics.service';
import { GlobalMetricsController } from './global-metrics.controller';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule)
  ],
  controllers: [GlobalMetricsController],
  providers: [GlobalMetricsService],
  exports: [GlobalMetricsService]
})
export class GlobalMetricsModule {}
