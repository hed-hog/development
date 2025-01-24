import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { DiscountTypeService } from './discount-type.service';
import { DiscountTypeController } from './discount-type.controller';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule)
  ],
  controllers: [DiscountTypeController],
  providers: [DiscountTypeService],
  exports: [DiscountTypeService]
})
export class DiscountTypeModule {}
