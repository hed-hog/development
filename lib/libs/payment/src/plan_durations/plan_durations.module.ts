import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { Plan_durationsService } from './plan_durations.service';
import { Plan_durationsController } from './plan_durations.controller';
@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
  controllers: [Plan_durationsController],
  providers: [Plan_durationsService],
  exports: [Plan_durationsService],
})
export class Plan_durationsModule {}
