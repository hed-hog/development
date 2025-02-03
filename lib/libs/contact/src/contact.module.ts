import { AdminModule } from '@hedhog/admin';
import { LocaleModule } from '@hedhog/locale';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { PersonAddressTypeModule } from './person-address-type/person-address-type.module';
import { PersonContactTypeModule } from './person-contact-type/person-contact-type.module';
import { PersonCustomTypeModule } from './person-custom-type/person-custom-type.module';
import { PersonDocumentTypeModule } from './person-document-type/person-document-type.module';
import { PersonTypeModule } from './person-type/person-type.module';
import { PersonModule } from './person/person.module';
@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => LocaleModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
    forwardRef(() => PersonTypeModule),
    forwardRef(() => PersonModule),
    forwardRef(() => PersonDocumentTypeModule),
    forwardRef(() => PersonContactTypeModule),
    forwardRef(() => PersonAddressTypeModule),
    forwardRef(() => PersonCustomTypeModule),
  ],
  controllers: [],
  providers: [ContactService],
  exports: [ContactService],
})
export class ContactModule {}
