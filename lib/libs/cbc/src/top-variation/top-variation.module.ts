import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { TopVariationService } from './top-variation.service';
import { TopVariationController } from './top-variation.controller';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule)
  ],
  controllers: [TopVariationController],
  providers: [TopVariationService],
  exports: [TopVariationService]
})
export class TopVariationModule {}
