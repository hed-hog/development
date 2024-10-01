import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { Module, forwardRef } from '@nestjs/common';
import { DocumentTypeController } from './document-type.controller';
import { DocumentTypeService } from './document-type.service';
import { AuthModule } from '../../../admin/src/auth/auth.module';

@Module({
  providers: [DocumentTypeService],
  exports: [DocumentTypeService],
  controllers: [DocumentTypeController],
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
})
export class DocumentTypeModule {}
