import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { QuotationTypeService } from './quotation-type.service';
import { QuotationTypeController } from './quotation-type.controller';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule)
  ],
  controllers: [QuotationTypeController],
  providers: [QuotationTypeService],
  exports: [QuotationTypeService]
})
export class QuotationTypeModule {}
