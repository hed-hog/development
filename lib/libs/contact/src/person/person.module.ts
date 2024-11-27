import { AdminModule } from "@hedhog/admin";
import { PaginationModule } from "@hedhog/pagination";
import { PrismaModule } from "@hedhog/prisma";
import { forwardRef, Module } from "@nestjs/common";
import { PersonValueController } from "./person-value/person-value.controller";
import { PersonValueService } from "./person-value/person-value.service";
import { PersonAddressController } from "./person-address/person-address.controller";
import { PersonAddressService } from "./person-address/person-address.service";
import { PersonContactController } from "./person-contact/person-contact.controller";
import { PersonContactService } from "./person-contact/person-contact.service";
import { PersonDocumentController } from "./person-document/person-document.controller";
import { PersonDocumentService } from "./person-document/person-document.service";
import { PersonCustomController } from "./person-custom/person-custom.controller";
import { PersonCustomService } from "./person-custom/person-custom.service";
import { PersonController } from "./person.controller";
import { PersonService } from "./person.service";
@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
  controllers: [
    PersonValueController,
    PersonAddressController,
    PersonContactController,
    PersonDocumentController,
    PersonCustomController,
    PersonController,
  ],
  providers: [
    PersonValueService,
    PersonAddressService,
    PersonContactService,
    PersonDocumentService,
    PersonCustomService,
    PersonService,
  ],
  exports: [forwardRef(() => PersonService)],
})
export class PersonModule {}
