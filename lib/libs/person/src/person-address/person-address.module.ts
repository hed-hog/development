import { AdminModule } from "@hedhog/admin";
import { PaginationModule } from "@hedhog/pagination";
import { PrismaModule } from "@hedhog/prisma";
import { forwardRef, Module } from "@nestjs/common";
import { PersonAddressService } from "./person-address.service";
import { PersonAddressController } from "./person-address.controller";
@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
  controllers: [PersonAddressController],
  providers: [PersonAddressService],
  exports: [PersonAddressService],
})
export class PersonAddressModule {}
