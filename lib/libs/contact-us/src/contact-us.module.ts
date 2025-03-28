import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { ContactUsModule as ContactUsModuleSubModule } from './contact-us/contact-us.module';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
    forwardRef(() => ContactUsModuleSubModule),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class ContactUsModule {}
