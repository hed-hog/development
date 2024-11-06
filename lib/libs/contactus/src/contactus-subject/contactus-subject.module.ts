import { AdminModule } from "@hedhog/admin";
import { PaginationModule } from "@hedhog/pagination";
import { PrismaModule } from "@hedhog/prisma";
import { forwardRef, Module } from "@nestjs/common";
import { ContactusSubjectService } from "./contactus-subject.service";
import { ContactusSubjectController } from "./contactus-subject.controller";
@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
  controllers: [ContactusSubjectController],
  providers: [ContactusSubjectService],
  exports: [ContactusSubjectService],
})
export class ContactusSubjectModule {}
