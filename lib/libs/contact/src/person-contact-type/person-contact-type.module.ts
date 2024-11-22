import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { PersonContactTypeService } from './person-contact-type.service';
import { PersonContactTypeController } from './person-contact-type.controller';
@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule)
  ],
  controllers: [PersonContactTypeController],
  providers: [PersonContactTypeService],
  exports: [forwardRef(() => PersonContactTypeService)]
})
export class PersonContactTypeModule {}
