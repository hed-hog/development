import { AdminModule } from "@hedhog/admin";
import { PaginationModule } from "@hedhog/pagination";
import { PrismaModule } from "@hedhog/prisma";
import { forwardRef, Module } from "@nestjs/common";
import { ComponentInstanceService } from "./component-instance.service";
import { ComponentInstanceController } from "./component-instance.controller";
@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
  controllers: [ComponentInstanceController],
  providers: [ComponentInstanceService],
  exports: [forwardRef(() => ComponentInstanceService)],
})
export class ComponentInstanceModule {}
