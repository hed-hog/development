import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { Module, forwardRef } from '@nestjs/common';
import { AddressTypeController } from './address-type.controller';
import { AddressTypeService } from './address-type.service';
import { AuthModule } from '../../../admin/src/auth/auth.module';

@Module({
  providers: [AddressTypeService],
  exports: [AddressTypeService],
  controllers: [AddressTypeController],
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
})
export class AddressTypeModule {}
