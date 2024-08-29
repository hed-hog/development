import { Module } from '@nestjs/common';
import { PaginationService } from './pagination.service';
import { PrismaModule } from '@hedhog/prisma';

@Module({
  imports: [PrismaModule],
  providers: [PaginationService],
  exports: [PaginationService],
})
export class PaginationModule {}
