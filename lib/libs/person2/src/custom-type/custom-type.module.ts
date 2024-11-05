import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { Module, forwardRef } from '@nestjs/common';
import { CustomTypeController } from './custom-type.controller';
import { CustomTypeService } from './custom-type.service';
import { AdminModule } from '@hedhog/admin';

@Module({
  providers: [CustomTypeService],
  exports: [CustomTypeService],
  controllers: [CustomTypeController],
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
})
export class CustomTypeModule {}
