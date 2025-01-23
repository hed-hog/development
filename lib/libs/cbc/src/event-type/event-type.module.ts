import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { EventTypeService } from './event-type.service';
import { EventTypeController } from './event-type.controller';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule)
  ],
  controllers: [EventTypeController],
  providers: [EventTypeService],
  exports: [EventTypeService]
})
export class EventTypeModule {}
