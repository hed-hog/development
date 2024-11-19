import { AdminModule } from '@hedhog/admin';
import { PersonCustomController } from './person-custom/person-custom.controller';
import { PersonCustomService } from './person-custom/person-custom.service';
import { PersonAddressController } from './person-address/person-address.controller';
import { PersonAddressService } from './person-address/person-address.service';
import { PersonContactController } from './person-contact/person-contact.controller';
import { PersonContactService } from './person-contact/person-contact.service';
import { PersonDocumentController } from './person-document/person-document.controller';
import { PersonDocumentService } from './person-document/person-document.service';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { CountryController } from './country/country.controller';
import { CountryService } from './country/country.service';
@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
  controllers: [
    CountryController,
    PersonController,
    PersonDocumentController,
    PersonContactController,
    PersonAddressController,
    PersonCustomController,
  ],
  providers: [
    CountryService,
    PersonService,
    PersonDocumentService,
    PersonContactService,
    PersonAddressService,
    PersonCustomService,
  ],
  exports: [forwardRef(() => PersonService)],
})
export class PersonModule {}
