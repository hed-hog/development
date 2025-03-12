import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { InstancePropService } from './instance-prop.service';
import { InstancePropController } from './instance-prop.controller';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule)
  ],
  controllers: [InstancePropController],
  providers: [InstancePropService],
  exports: [InstancePropService]
})
export class InstancePropModule {}
