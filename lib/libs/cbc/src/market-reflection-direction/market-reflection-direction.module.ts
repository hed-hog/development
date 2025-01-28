import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { MarketReflectionDirectionService } from './market-reflection-direction.service';
import { MarketReflectionDirectionController } from './market-reflection-direction.controller';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule)
  ],
  controllers: [MarketReflectionDirectionController],
  providers: [MarketReflectionDirectionService],
  exports: [MarketReflectionDirectionService]
})
export class MarketReflectionDirectionModule {}
