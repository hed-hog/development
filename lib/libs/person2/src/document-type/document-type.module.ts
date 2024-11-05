import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { Module, forwardRef } from '@nestjs/common';
import { DocumentTypeController } from './document-type.controller';
import { DocumentTypeService } from './document-type.service';
import { AdminModule } from '@hedhog/admin';

@Module({
  providers: [DocumentTypeService],
  exports: [DocumentTypeService],
  controllers: [DocumentTypeController],
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
})
export class DocumentTypeModule {}
