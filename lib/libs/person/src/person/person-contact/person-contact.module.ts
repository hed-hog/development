import { AdminModule } from "@hedhog/admin";
import { PaginationModule } from "@hedhog/pagination";
import { PrismaModule } from "@hedhog/prisma";
import { forwardRef, Module } from "@nestjs/common";
import { PersonContactService } from "./person-contact.service";
import { PersonContactController } from "./person-contact.controller";
@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
  controllers: [PersonContactController],
  providers: [PersonContactService],
  exports: [PersonContactService],
})
export class PersonContactModule {}
