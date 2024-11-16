import { AdminModule } from "@hedhog/admin";
import { PaginationModule } from "@hedhog/pagination";
import { PrismaModule } from "@hedhog/prisma";
import { forwardRef, Module } from "@nestjs/common";
import { PageService } from "./page.service";
import { PageController } from "./page.controller";
@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
  controllers: [PageController],
  providers: [PageService],
  exports: [forwardRef(() => PageService)],
})
export class PageModule {}
