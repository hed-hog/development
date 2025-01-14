import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { FearAndGreedService } from './fear-and-greed.service';
import { FearAndGreedController } from './fear-and-greed.controller';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule)
  ],
  controllers: [FearAndGreedController],
  providers: [FearAndGreedService],
  exports: [FearAndGreedService]
})
export class FearAndGreedModule {}
