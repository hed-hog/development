import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { StockExchangeService } from './stock-exchange.service';
import { StockExchangeController } from './stock-exchange.controller';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule)
  ],
  controllers: [StockExchangeController],
  providers: [StockExchangeService],
  exports: [StockExchangeService]
})
export class StockExchangeModule {}
