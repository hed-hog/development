import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { LocaleModule } from '@hedhog/locale';
import { MenuModule } from './menu/menu.module';
import { RoleModule } from './role/role.module';
import { RouteModule } from './route/route.module';
import { ScreenModule } from './screen/screen.module';
import { UserModule } from './user/user.module';
import { MailModule } from '@hedhog/mail';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => MailModule),
    forwardRef(() => MenuModule),
    forwardRef(() => PaginationModule),
    forwardRef(() => RoleModule),
    forwardRef(() => RouteModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => ScreenModule),
    forwardRef(() => LocaleModule),
    forwardRef(() => UserModule),
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
