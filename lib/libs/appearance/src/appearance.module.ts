import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { AppearanceController } from './appearance/appearance.controller';
import { AppearanceService } from './appearance/appearance.service';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
  controllers: [AppearanceController],
  providers: [AppearanceService],
  exports: [],
})
export class AppearanceModule {}
