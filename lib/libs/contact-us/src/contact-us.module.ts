import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { ContactUsController } from './contact-us.controller';
import { ContactUsService } from './contact-us.service';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
  controllers: [ContactUsController],
  providers: [ContactUsService],
  exports: [ContactUsService],
})
export class ContactUsModule {}
