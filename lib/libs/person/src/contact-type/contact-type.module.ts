import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { Module, forwardRef } from '@nestjs/common';
import { ContactTypeController } from './contact-type.controller';
import { ContactTypeService } from './contact-type.service';
import { AdminModule } from '@hedhog/admin';

@Module({
  providers: [ContactTypeService],
  exports: [ContactTypeService],
  controllers: [ContactTypeController],
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
})
export class ContactTypeModule {}
