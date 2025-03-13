import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { DashboardItemService } from './dashboard-item.service';
import { DashboardItemController } from './dashboard-item.controller';

@Module({
  imports: [forwardRef(() => PrismaModule), forwardRef(() => PaginationModule)],
  controllers: [DashboardItemController],
  providers: [DashboardItemService],
  exports: [DashboardItemService],
})
export class DashboardItemModule {}
