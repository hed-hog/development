import { AdminModule } from "@hedhog/admin";
import { PaginationModule } from "@hedhog/pagination";
import { PrismaModule } from "@hedhog/prisma";
import { forwardRef, Module } from "@nestjs/common";
import { PersonAddressTypeService } from "./person-address-type.service";
import { PersonAddressTypeController } from "./person-address-type.controller";
@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
  controllers: [PersonAddressTypeController],
  providers: [PersonAddressTypeService],
  exports: [PersonAddressTypeService],
})
export class PersonAddressTypeModule {}
