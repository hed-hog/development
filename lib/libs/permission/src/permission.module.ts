import { AuthModule } from '@hedhog/auth';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { PermissionService } from './permission.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
  controllers: [PermissionModule],
  providers: [PermissionService],
  exports: [PermissionService],
})
export class PermissionModule {}
