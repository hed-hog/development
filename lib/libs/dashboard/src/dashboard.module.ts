import { forwardRef, Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { LocaleModule } from '@hedhog/locale';
@Module({
  imports: [forwardRef(() => LocaleModule)],
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [forwardRef(() => DashboardService)],
})
export class DashboardModule {}
