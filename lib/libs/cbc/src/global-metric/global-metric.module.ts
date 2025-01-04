import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { GlobalMetricService } from './global-metric.service';
import { GlobalMetricController } from './global-metric.controller';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule)
  ],
  controllers: [GlobalMetricController],
  providers: [GlobalMetricService],
  exports: [GlobalMetricService]
})
export class GlobalMetricModule {}
