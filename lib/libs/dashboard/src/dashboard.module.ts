import { DashboardComponentModule } from './dashboard-component/dashboard-component.module';
import { DashboardUserModule } from './dashboard-user/dashboard-user.module';
import { DashboardItemModule } from './dashboard-item/dashboard-item.module';
import { LocaleModule } from '@hedhog/locale';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { DashboardModule2 } from './dashboard/dashboard.module';

@Module({
  imports: [
    forwardRef(() => LocaleModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => DashboardModule2),
    forwardRef(() => DashboardComponentModule),
    forwardRef(() => DashboardItemModule),
    forwardRef(() => DashboardUserModule),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class DashboardModule {}
