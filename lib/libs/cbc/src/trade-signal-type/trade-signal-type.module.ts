import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { TradeSignalTypeService } from './trade-signal-type.service';
import { TradeSignalTypeController } from './trade-signal-type.controller';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule)
  ],
  controllers: [TradeSignalTypeController],
  providers: [TradeSignalTypeService],
  exports: [TradeSignalTypeService]
})
export class TradeSignalTypeModule {}
