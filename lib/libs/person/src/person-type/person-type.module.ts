import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { Module, forwardRef } from '@nestjs/common';
import { PersonTypeController } from './person-type.controller';
import { PersonTypeService } from './person-type.service';
import { AdminModule } from '@hedhog/admin';

@Module({
  providers: [PersonTypeService],
  exports: [PersonTypeService],
  controllers: [PersonTypeController],
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
})
export class PersonTypeModule {}
