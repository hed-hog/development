import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { WalletPersonService } from './wallet-person.service';
import { WalletPersonController } from './wallet-person.controller';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule)
  ],
  controllers: [WalletPersonController],
  providers: [WalletPersonService],
  exports: [WalletPersonService]
})
export class WalletPersonModule {}
