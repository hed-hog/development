import { AdminModule } from '@hedhog/admin';
import { LocaleModule } from '@hedhog/locale';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { CoinModule } from './coin/coin.module';
import { QuotationTypeModule } from './quotation-type/quotation-type.module';
import { QuotationModule } from './quotation/quotation.module';
import { StockExchangeModule } from './stock-exchange/stock-exchange.module';
import { TrendTypeModule } from './trend-type/trend-type.module';
@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => LocaleModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
    forwardRef(() => CoinModule),
    forwardRef(() => QuotationModule),
    forwardRef(() => QuotationTypeModule),
    forwardRef(() => StockExchangeModule),
    forwardRef(() => TrendTypeModule),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class CbcModule {}
