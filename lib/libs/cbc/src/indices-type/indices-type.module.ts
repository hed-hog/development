import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { IndicesTypeService } from './indices-type.service';
import { IndicesTypeController } from './indices-type.controller';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule)
  ],
  controllers: [IndicesTypeController],
  providers: [IndicesTypeService],
  exports: [IndicesTypeService]
})
export class IndicesTypeModule {}
