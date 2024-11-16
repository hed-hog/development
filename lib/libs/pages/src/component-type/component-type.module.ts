import { AdminModule } from "@hedhog/admin";
import { PaginationModule } from "@hedhog/pagination";
import { PrismaModule } from "@hedhog/prisma";
import { forwardRef, Module } from "@nestjs/common";
import { ComponentTypeService } from "./component-type.service";
import { ComponentTypeController } from "./component-type.controller";
@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
  controllers: [ComponentTypeController],
  providers: [ComponentTypeService],
  exports: [forwardRef(() => ComponentTypeService)],
})
export class ComponentTypeModule {}
