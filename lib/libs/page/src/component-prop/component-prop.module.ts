import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { ComponentPropService } from './component-prop.service';
import { ComponentPropController } from './component-prop.controller';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule)
  ],
  controllers: [ComponentPropController],
  providers: [ComponentPropService],
  exports: [ComponentPropService]
})
export class ComponentPropModule {}
