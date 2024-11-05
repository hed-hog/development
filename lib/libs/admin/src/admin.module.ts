import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { LocaleModule } from '@hedhog/locale';
import { MenuModule } from './menu/menu.module';
import { RoleModule } from './role/role.module';
import { RouteModule } from './route/route.module';
import { ScreenModule } from './screen/screen.module';
import { SettingModule } from './setting/setting.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => MenuModule),
    forwardRef(() => PaginationModule),
    forwardRef(() => RoleModule),
    forwardRef(() => RouteModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => ScreenModule),
    forwardRef(() => SettingModule),
    forwardRef(() => LocaleModule),
    forwardRef(() => UserModule),
  ],
  exports: [
    UserModule,
    AuthModule,
    RouteModule,
    RoleModule,
    MenuModule,
    SettingModule,
    ScreenModule,
    LocaleModule,
  ],
})
export class AdminModule {}
