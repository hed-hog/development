import { PrismaModule } from '@hedhog/prisma';
import { PaginationModule } from '@hedhog/pagination';
import {
  AuthModule,
  MenuModule,
  PermissionModule,
  ScreenModule,
  UserModule,
} from './';
import { forwardRef, Module } from '@nestjs/common';

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
