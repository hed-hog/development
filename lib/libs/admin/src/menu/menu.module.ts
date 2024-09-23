import { AuthModule } from '../auth/auth.module';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { Module, forwardRef } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { PermissionModule } from '../role/role.module';

@Module({
  providers: [MenuService],
  exports: [MenuService],
  controllers: [MenuController],
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
    forwardRef(() => PermissionModule),
  ],
})
export class MenuModule {}
