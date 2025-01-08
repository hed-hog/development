import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { TopCoinService } from './top-coin.service';
import { TopCoinController } from './top-coin.controller';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule)
  ],
  controllers: [TopCoinController],
  providers: [TopCoinService],
  exports: [TopCoinService]
})
export class TopCoinModule {}
