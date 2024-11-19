import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { PersonCustomTypeService } from './person-custom-type.service';
import { PersonCustomTypeController } from './person-custom-type.controller';
import { LocaleModule } from '@hedhog/locale';
@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => LocaleModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
  controllers: [PersonCustomTypeController],
  providers: [PersonCustomTypeService],
  exports: [forwardRef(() => PersonCustomTypeService)],
})
export class PersonCustomTypeModule {}
