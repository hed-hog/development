import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { TopCmcService } from './top-cmc.service';
import { TopCmcController } from './top-cmc.controller';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule)
  ],
  controllers: [TopCmcController],
  providers: [TopCmcService],
  exports: [TopCmcService]
})
export class TopCmcModule {}
