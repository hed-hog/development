import { AuthModule } from '@hedhog/auth';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { Module, forwardRef } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';

@Module({
  providers: [MenuService],
  exports: [MenuService],
  controllers: [MenuController],
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
})
export class MenuModule {}
