import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { EventOccurrenceService } from './event-occurrence.service';
import { EventOccurrenceController } from './event-occurrence.controller';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule)
  ],
  controllers: [EventOccurrenceController],
  providers: [EventOccurrenceService],
  exports: [EventOccurrenceService]
})
export class EventOccurrenceModule {}
