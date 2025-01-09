import { ComponentPropTypeModule } from './component-prop-type/component-prop-type.module';
import { ComponentModule } from './component/component.module';
import { ComponentTypeModule } from './component-type/component-type.module';
import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
    forwardRef(() => ComponentTypeModule),
    forwardRef(() => ComponentModule),
    forwardRef(() => ComponentPropTypeModule),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class PageModule {}
