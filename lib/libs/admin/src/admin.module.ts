import { PrismaModule } from '@hedhog/prisma';
import { PaginationModule } from '@hedhog/pagination';
import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MenuModule } from './menu/menu.module';
import { PermissionModule } from './permission/permission.module';
import { ScreenModule } from './screen/screen.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => MenuModule),
    forwardRef(() => PaginationModule),
    forwardRef(() => PermissionModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => ScreenModule),
    forwardRef(() => UserModule),
  ],
})
export class AdminModule {}
