import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { PersonAddressTypeService } from './person-address-type.service';
import { PersonAddressTypeController } from './person-address-type.controller';
import { LocaleModule } from '@hedhog/locale';
@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => LocaleModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
  controllers: [PersonAddressTypeController],
  providers: [PersonAddressTypeService],
  exports: [forwardRef(() => PersonAddressTypeService)],
})
export class PersonAddressTypeModule {}
