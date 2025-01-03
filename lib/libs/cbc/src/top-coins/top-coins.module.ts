import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { TopCoinsService } from './top-coins.service';
import { TopCoinsController } from './top-coins.controller';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule)
  ],
  controllers: [TopCoinsController],
  providers: [TopCoinsService],
  exports: [TopCoinsService]
})
export class TopCoinsModule {}
