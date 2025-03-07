import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { LocaleModule } from '@hedhog/locale';
import { forwardRef, Module } from '@nestjs/common';
import { DashboardComponentService } from './dashboard-component.service';
import { DashboardComponentController } from './dashboard-component.controller';

@Module({
  imports: [forwardRef(() => LocaleModule), forwardRef(() => PrismaModule)],
  controllers: [DashboardComponentController],
  providers: [DashboardComponentService],
  exports: [DashboardComponentService],
})
export class DashboardComponentModule {}
