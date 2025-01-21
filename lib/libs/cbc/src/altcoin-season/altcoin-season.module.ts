import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { AltcoinSeasonService } from './altcoin-season.service';
import { AltcoinSeasonController } from './altcoin-season.controller';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule)
  ],
  controllers: [AltcoinSeasonController],
  providers: [AltcoinSeasonService],
  exports: [AltcoinSeasonService]
})
export class AltcoinSeasonModule {}
