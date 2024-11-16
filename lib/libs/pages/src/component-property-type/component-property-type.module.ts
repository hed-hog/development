import { AdminModule } from "@hedhog/admin";
import { PaginationModule } from "@hedhog/pagination";
import { PrismaModule } from "@hedhog/prisma";
import { forwardRef, Module } from "@nestjs/common";
import { ComponentPropertyTypeService } from "./component-property-type.service";
import { ComponentPropertyTypeController } from "./component-property-type.controller";
@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
  controllers: [ComponentPropertyTypeController],
  providers: [ComponentPropertyTypeService],
  exports: [forwardRef(() => ComponentPropertyTypeService)],
})
export class ComponentPropertyTypeModule {}
