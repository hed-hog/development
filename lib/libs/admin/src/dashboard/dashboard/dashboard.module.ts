import { LocaleModule } from '@hedhog/locale';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [forwardRef(() => LocaleModule), forwardRef(() => PrismaModule)],
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [forwardRef(() => DashboardService)],
})
export class DashboardModule2 {}
