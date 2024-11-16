import { AdminModule } from "@hedhog/admin";
import { PaginationModule } from "@hedhog/pagination";
import { PrismaModule } from "@hedhog/prisma";
import { forwardRef, Module } from "@nestjs/common";
import { ComponentInstancePropertyService } from "./component-instance-property.service";
import { ComponentInstancePropertyController } from "./component-instance-property.controller";
@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
  controllers: [ComponentInstancePropertyController],
  providers: [ComponentInstancePropertyService],
  exports: [forwardRef(() => ComponentInstancePropertyService)],
})
export class ComponentInstancePropertyModule {}
