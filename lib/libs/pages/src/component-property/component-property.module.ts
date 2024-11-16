import { AdminModule } from "@hedhog/admin";
import { PaginationModule } from "@hedhog/pagination";
import { PrismaModule } from "@hedhog/prisma";
import { forwardRef, Module } from "@nestjs/common";
import { ComponentPropertyService } from "./component-property.service";
import { ComponentPropertyController } from "./component-property.controller";
@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
  controllers: [ComponentPropertyController],
  providers: [ComponentPropertyService],
  exports: [forwardRef(() => ComponentPropertyService)],
})
export class ComponentPropertyModule {}
