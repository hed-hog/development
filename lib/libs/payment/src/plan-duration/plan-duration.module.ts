import { AdminModule } from "@hedhog/admin";
import { PaginationModule } from "@hedhog/pagination";
import { PrismaModule } from "@hedhog/prisma";
import { forwardRef, Module } from "@nestjs/common";
import { PlanDurationService } from "./plan-duration.service";
import { PlanDurationController } from "./plan-duration.controller";
@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
  controllers: [PlanDurationController],
  providers: [PlanDurationService],
  exports: [PlanDurationService],
})
export class PlanDurationModule {}
