import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { NotificationTypeService } from './notification-type.service';
import { NotificationTypeController } from './notification-type.controller';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule)
  ],
  controllers: [NotificationTypeController],
  providers: [NotificationTypeService],
  exports: [NotificationTypeService]
})
export class NotificationTypeModule {}
