import { AdminModule } from "@hedhog/admin";
import { PaginationModule } from "@hedhog/pagination";
import { PrismaModule } from "@hedhog/prisma";
import { forwardRef, Module } from "@nestjs/common";
import { ContactusService } from "./contactus.service";
import { ContactusController } from "./contactus.controller";
@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
  controllers: [ContactusController],
  providers: [ContactusService],
  exports: [ContactusService],
})
export class ContactusModule {}
