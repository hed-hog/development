import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { IndiceTypeService } from './indice-type.service';
import { IndiceTypeController } from './indice-type.controller';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule)
  ],
  controllers: [IndiceTypeController],
  providers: [IndiceTypeService],
  exports: [IndiceTypeService]
})
export class IndiceTypeModule {}
