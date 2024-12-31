import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { QuotationRequestTypeService } from './quotation-request-type.service';
import { QuotationRequestTypeController } from './quotation-request-type.controller';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule)
  ],
  controllers: [QuotationRequestTypeController],
  providers: [QuotationRequestTypeService],
  exports: [QuotationRequestTypeService]
})
export class QuotationRequestTypeModule {}
