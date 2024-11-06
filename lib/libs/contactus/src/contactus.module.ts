import { ContactusSubjectModule } from './contactus-subject/contactus-subject.module';
import { ContactusModule } from './contactus/contactus.module';
import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
    forwardRef(() => ContactusModule),
    forwardRef(() => ContactusSubjectModule),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class ContactusModule {}
