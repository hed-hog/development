import { forwardRef, Module } from '@nestjs/common';

import { LocaleModule } from '@hedhog/locale';
import { PrismaModule } from '@hedhog/prisma';
import { DashboardCoreController } from './dashboard-core.controller';
import { DashboardCoreService } from './dashboard-core.service';

@Module({
  imports: [forwardRef(() => LocaleModule), forwardRef(() => PrismaModule)],
  controllers: [DashboardCoreController],
  providers: [DashboardCoreService],
  exports: [DashboardCoreService],
})
export class DashboardCoreModule {}
