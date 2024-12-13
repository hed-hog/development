import { QuoteModule } from './quote/quote.module';
import { QuotesModule } from './quotes/quotes.module';
import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
    forwardRef(() => QuotesModule),
    forwardRef(() => QuoteModule),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class CoinbitclubModule {}
