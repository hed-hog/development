import { AdminModule } from "@hedhog/admin";
import { PaginationModule } from "@hedhog/pagination";
import { PrismaModule } from "@hedhog/prisma";
import { forwardRef, Module } from "@nestjs/common";
import { PersonDocumentService } from "./person-document.service";
import { PersonDocumentController } from "./person-document.controller";
@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
  controllers: [PersonDocumentController],
  providers: [PersonDocumentService],
  exports: [PersonDocumentService],
})
export class PersonDocumentModule {}
