import { AdminModule } from "@hedhog/admin";
import { PaginationModule } from "@hedhog/pagination";
import { PrismaModule } from "@hedhog/prisma";
import { forwardRef, Module } from "@nestjs/common";
import { PersonDocumentTypeService } from "./person-document-type.service";
import { PersonDocumentTypeController } from "./person-document-type.controller";
@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
  controllers: [PersonDocumentTypeController],
  providers: [PersonDocumentTypeService],
  exports: [forwardRef(() => PersonDocumentTypeService)],
})
export class PersonDocumentTypeModule {}
