import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { GainersLosersService } from './gainers-losers.service';
import { GainersLosersController } from './gainers-losers.controller';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule)
  ],
  controllers: [GainersLosersController],
  providers: [GainersLosersService],
  exports: [GainersLosersService]
})
export class GainersLosersModule {}
