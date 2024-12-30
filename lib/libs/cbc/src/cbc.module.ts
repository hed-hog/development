import { FreeBalanceConditionModule } from './free-balance-condition/free-balance-condition.module';
import { TradeSignalTypeModule } from './trade-signal-type/trade-signal-type.module';
import { StrategyModule } from './strategy/strategy.module';
import { OperationModule } from './operation/operation.module';
import { BankingModule } from './banking/banking.module';
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
    forwardRef(() => BankingModule),
    forwardRef(() => OperationModule),
    forwardRef(() => StrategyModule),
    forwardRef(() => TradeSignalTypeModule),
    forwardRef(() => FreeBalanceConditionModule),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class CbcModule {}
