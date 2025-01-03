import { AdminModule } from '@hedhog/admin';
import { LocaleModule } from '@hedhog/locale';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { BankingModule } from './banking/banking.module';
import { BotModule } from './bot/bot.module';
import { CoinModule } from './coin/coin.module';
import { FearAndGreedModule } from './fear-and-greed/fear-and-greed.module';
import { FreeBalanceConditionModule } from './free-balance-condition/free-balance-condition.module';
import { GainersLosersModule } from './gainers-losers/gainers-losers.module';
import { GlobalMetricsModule } from './global-metrics/global-metrics.module';
import { MmrModule } from './mmr/mmr.module';
import { OperationModule } from './operation/operation.module';
import { QuotationRequestTypeModule } from './quotation-request-type/quotation-request-type.module';
import { QuotationTypeModule } from './quotation-type/quotation-type.module';
import { QuotationModule } from './quotation/quotation.module';
import { StockExchangeModule } from './stock-exchange/stock-exchange.module';
import { StrategyModule } from './strategy/strategy.module';
import { TopCoinsModule } from './top-coins/top-coins.module';
import { TradeSignalTypeModule } from './trade-signal-type/trade-signal-type.module';
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
    forwardRef(() => MmrModule),
    forwardRef(() => BotModule),
    forwardRef(() => QuotationRequestTypeModule),
    forwardRef(() => FearAndGreedModule),
    forwardRef(() => GlobalMetricsModule),
    forwardRef(() => GainersLosersModule),
    forwardRef(() => TopCoinsModule),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class CbcModule { }
