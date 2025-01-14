import { TopCmcModule } from './top-cmc/top-cmc.module';
import { AdminModule } from '@hedhog/admin';
import { LocaleModule } from '@hedhog/locale';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { BankingModule } from './banking/banking.module';
import { BotModule } from './bot/bot.module';
import { CoinVariationTypeModule } from './coin-variation-type/coin-variation-type.module';
import { CoinModule } from './coin/coin.module';
import { FearAndGreedModule } from './fear-and-greed/fear-and-greed.module';
import { FreeBalanceConditionModule } from './free-balance-condition/free-balance-condition.module';
import { GainerLoserModule } from './gainer-loser/gainer-loser.module';
import { GlobalMetricModule } from './global-metric/global-metric.module';
import { MmrModule } from './mmr/mmr.module';
import { OperationModule } from './operation/operation.module';
import { QuotationRequestTypeModule } from './quotation-request-type/quotation-request-type.module';
import { QuotationModule } from './quotation/quotation.module';
import { SimulationModule } from './simulation/simulation.module';
import { StockExchangeModule } from './stock-exchange/stock-exchange.module';
import { StrategyModule } from './strategy/strategy.module';
import { TopCoinTypeModule } from './top-coin-type/top-coin-type.module';
import { TopCoinModule } from './top-coin/top-coin.module';
import { TopVariationModule } from './top-variation/top-variation.module';
import { TradeSignalTypeModule } from './trade-signal-type/trade-signal-type.module';
@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => LocaleModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
    forwardRef(() => CoinModule),
    forwardRef(() => QuotationModule),
    forwardRef(() => StockExchangeModule),
    forwardRef(() => BankingModule),
    forwardRef(() => OperationModule),
    forwardRef(() => StrategyModule),
    forwardRef(() => TradeSignalTypeModule),
    forwardRef(() => FreeBalanceConditionModule),
    forwardRef(() => MmrModule),
    forwardRef(() => BotModule),
    forwardRef(() => QuotationRequestTypeModule),
    forwardRef(() => FearAndGreedModule),
    forwardRef(() => SimulationModule),
    forwardRef(() => GlobalMetricModule),
    forwardRef(() => TopCoinTypeModule),
    forwardRef(() => TopCoinModule),
    forwardRef(() => TopVariationModule),
    forwardRef(() => CoinVariationTypeModule),
    forwardRef(() => GainerLoserModule),
    forwardRef(() => TopCmcModule),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class CbcModule {}
