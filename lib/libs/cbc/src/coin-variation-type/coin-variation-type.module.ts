import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { CoinVariationTypeService } from './coin-variation-type.service';
import { CoinVariationTypeController } from './coin-variation-type.controller';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule)
  ],
  controllers: [CoinVariationTypeController],
  providers: [CoinVariationTypeService],
  exports: [CoinVariationTypeService]
})
export class CoinVariationTypeModule {}
