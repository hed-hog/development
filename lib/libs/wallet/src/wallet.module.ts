import { WalletTransactionModule } from './wallet-transaction/wallet-transaction.module';
import { WalletPersonModule } from './wallet-person/wallet-person.module';
import { WalletModule as WalletModule2 } from './wallet/wallet.module';
import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
    forwardRef(() => WalletModule2),
    forwardRef(() => WalletPersonModule),
    forwardRef(() => WalletTransactionModule),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class WalletModule {}
