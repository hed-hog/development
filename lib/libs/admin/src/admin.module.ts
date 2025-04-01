import { LocaleModule } from '@hedhog/locale';
import { MailModule } from '@hedhog/mail';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { MenuModule } from './menu/menu.module';
import { RoleModule } from './role/role.module';
import { RouteModule } from './route/route.module';
import { ScreenModule } from './screen/screen.module';
import { SettingModule } from './setting/setting.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    forwardRef(() => AuthModule),
    forwardRef(() => DashboardModule),
    forwardRef(() => MailModule),
    forwardRef(() => MenuModule),
    forwardRef(() => PaginationModule),
    forwardRef(() => RoleModule),
    forwardRef(() => RouteModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => ScreenModule),
    forwardRef(() => LocaleModule),
    forwardRef(() => UserModule),
    forwardRef(() => CoreModule),
    forwardRef(() => SettingModule),
  ],
  exports: [
    UserModule,
    AuthModule,
    MailModule,
    RouteModule,
    RoleModule,
    MenuModule,
    ScreenModule,
    LocaleModule,
  ],
})
export class AdminModule {}
