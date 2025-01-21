import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { IndiceService } from './indice.service';
import { IndiceController } from './indice.controller';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule)
  ],
  controllers: [IndiceController],
  providers: [IndiceService],
  exports: [IndiceService]
})
export class IndiceModule {}
