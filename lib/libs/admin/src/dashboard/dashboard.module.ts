import { LocaleModule } from '@hedhog/locale';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { DashboardComponentModule } from './dashboard-component/dashboard-component.module';
import { DashboardCoreModule } from './dashboard-core/dashboard-core.module';
import { DashboardItemModule } from './dashboard-item/dashboard-item.module';
import { DashboardUserModule } from './dashboard-user/dashboard-user.module';
import { DashboardModule2 } from './dashboard/dashboard.module';

@Module({
  imports: [
    forwardRef(() => LocaleModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => DashboardModule2),
    forwardRef(() => DashboardComponentModule),
    forwardRef(() => DashboardItemModule),
    forwardRef(() => DashboardUserModule),
    forwardRef(() => DashboardCoreModule),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class DashboardModule {}
