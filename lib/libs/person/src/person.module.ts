import { PersonCustomModule } from './person-custom/person-custom.module';
import { PersonCustomTypeModule } from './person-custom-type/person-custom-type.module';
import { PersonAddressModule } from './person-address/person-address.module';
import { PersonAddressTypeModule } from './person-address-type/person-address-type.module';
import { PersonContactModule } from './person-contact/person-contact.module';
import { PersonContactTypeModule } from './person-contact-type/person-contact-type.module';
import { PersonDocumentModule } from './person-document/person-document.module';
import { PersonDocumentTypeModule } from './person-document-type/person-document-type.module';
import { PersonSubModule } from './person/person.module';
import { PersonTypeModule } from './person-type/person-type.module';
import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
    forwardRef(() => PersonTypeModule),
    forwardRef(() => PersonSubModule),
    forwardRef(() => PersonDocumentTypeModule),
    forwardRef(() => PersonDocumentModule),
    forwardRef(() => PersonContactTypeModule),
    forwardRef(() => PersonContactModule),
    forwardRef(() => PersonAddressTypeModule),
    forwardRef(() => PersonAddressModule),
    forwardRef(() => PersonCustomTypeModule),
    forwardRef(() => PersonCustomModule),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class PersonModule {}
