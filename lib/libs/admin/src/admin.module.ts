import { PrismaModule } from '@hedhog/prisma';
import { PaginationModule } from '@hedhog/pagination';
import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MenuModule } from './menu/menu.module';

import { ScreenModule } from './screen/screen.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { RouteModule } from './route/route.module';
import { SettingModule } from './setting/settings.module';

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
  ],
})
export class AdminModule {}
