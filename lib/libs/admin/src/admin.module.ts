import { PrismaModule } from '@hedhog/prisma';
import { PaginationModule } from '@hedhog/pagination';
import {
  AuthModule,
  FileModule,
  MailModule,
  MenuModule,
  PermissionModule,
  ScreenModule,
  SettingModule,
  UserModule,
} from './';
import { forwardRef, Module } from '@nestjs/common';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => FileModule),
    forwardRef(() => MailModule),
    forwardRef(() => MenuModule),
    forwardRef(() => PaginationModule),
    forwardRef(() => PermissionModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => ScreenModule),
    forwardRef(() => SettingModule),
    forwardRef(() => UserModule),
  ],
})
export class AdminModule {}
