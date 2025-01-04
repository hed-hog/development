import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { GainersLoserService } from './gainers-loser.service';
import { GainersLoserController } from './gainers-loser.controller';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule)
  ],
  controllers: [GainersLoserController],
  providers: [GainersLoserService],
  exports: [GainersLoserService]
})
export class GainersLoserModule {}
