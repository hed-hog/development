import { AdminModule } from "@hedhog/admin";
import { PaginationModule } from "@hedhog/pagination";
import { PrismaModule } from "@hedhog/prisma";
import { forwardRef, Module } from "@nestjs/common";
import { PersonCustomService } from "./person-custom.service";
import { PersonCustomController } from "./person-custom.controller";
@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
  controllers: [PersonCustomController],
  providers: [PersonCustomService],
  exports: [PersonCustomService],
})
export class PersonCustomModule {}
