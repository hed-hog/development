import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { CardBrandService } from './card-brand.service';
import { CardBrandController } from './card-brand.controller';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule)
  ],
  controllers: [CardBrandController],
  providers: [CardBrandService],
  exports: [CardBrandService]
})
export class CardBrandModule {}
