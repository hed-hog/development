import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { ComponentPropTypeService } from './component-prop-type.service';
import { ComponentPropTypeController } from './component-prop-type.controller';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule)
  ],
  controllers: [ComponentPropTypeController],
  providers: [ComponentPropTypeService],
  exports: [ComponentPropTypeService]
})
export class ComponentPropTypeModule {}
