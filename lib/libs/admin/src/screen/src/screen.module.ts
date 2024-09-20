import { AuthModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { Module, forwardRef } from '@nestjs/common';
import { ScreenController } from './screen.controller';
import { ScreenService } from './screen.service';

@Module({
  providers: [ScreenService],
  exports: [ScreenService],
  controllers: [ScreenController],
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
})
export class ScreenModule {}
