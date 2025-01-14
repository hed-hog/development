import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { GainerLoserService } from './gainer-loser.service';
import { GainerLoserController } from './gainer-loser.controller';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule)
  ],
  controllers: [GainerLoserController],
  providers: [GainerLoserService],
  exports: [GainerLoserService]
})
export class GainerLoserModule {}
