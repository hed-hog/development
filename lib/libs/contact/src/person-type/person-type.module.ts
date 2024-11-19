import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { PersonTypeService } from './person-type.service';
import { PersonTypeController } from './person-type.controller';
import { LocaleModule } from '@hedhog/locale';
@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => LocaleModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
  controllers: [PersonTypeController],
  providers: [PersonTypeService],
  exports: [forwardRef(() => PersonTypeService)],
})
export class PersonTypeModule {}
