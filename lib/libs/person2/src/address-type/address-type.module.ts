import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { Module, forwardRef } from '@nestjs/common';
import { AddressTypeController } from './address-type.controller';
import { AddressTypeService } from './address-type.service';
import { AdminModule } from '@hedhog/admin';

@Module({
  providers: [AddressTypeService],
  exports: [AddressTypeService],
  controllers: [AddressTypeController],
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
})
export class AddressTypeModule {}
