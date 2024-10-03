import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { Module, forwardRef } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { AdminModule } from '@hedhog/admin';
import { ContactTypeModule } from './contact-type/contact-type.module';
import { AddressTypeModule } from './address-type/address-type.module';
import { CustomTypeModule } from './custom-type/custom-type.module';
import { DocumentTypeModule } from './document-type/document-type.module';
import { PersonTypeModule } from './person-type/person-type.module';
import { DocumentModule } from './document/document.module';

@Module({
  providers: [PersonService],
  exports: [PersonService],
  controllers: [PersonController],
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => AddressTypeModule),
    forwardRef(() => ContactTypeModule),
    forwardRef(() => CustomTypeModule),
    forwardRef(() => DocumentModule),
    forwardRef(() => DocumentTypeModule),
    forwardRef(() => PersonTypeModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
})
export class PersonModule {}
