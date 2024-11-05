import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { Module, forwardRef } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { AdminModule } from '@hedhog/admin';

@Module({
  providers: [AddressService],
  exports: [AddressService],
  controllers: [AddressController],
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
})
export class AddressModule {}
