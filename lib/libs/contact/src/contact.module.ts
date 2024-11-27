import { PersonTestModule } from './person-test/person-test.module';
import { PersonCustomTypeModule } from './person-custom-type/person-custom-type.module';
import { PersonAddressTypeModule } from './person-address-type/person-address-type.module';
import { PersonContactTypeModule } from './person-contact-type/person-contact-type.module';
import { PersonDocumentTypeModule } from './person-document-type/person-document-type.module';
import { PersonModule } from './person/person.module';
import { PersonTypeModule } from './person-type/person-type.module';
import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { LocaleModule } from '@hedhog/locale';
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
    forwardRef(() => PersonTestModule),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class ContactModule {}
