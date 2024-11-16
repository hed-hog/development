import { PageModule } from './page/page.module';
import { ComponentInstancePropertyModule } from './component-instance-property/component-instance-property.module';
import { ComponentInstanceModule } from './component-instance/component-instance.module';
import { ComponentPropertyModule } from './component-property/component-property.module';
import { ComponentPropertyTypeModule } from './component-property-type/component-property-type.module';
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
    forwardRef(() => ComponentPropertyTypeModule),
    forwardRef(() => ComponentPropertyModule),
    forwardRef(() => ComponentInstanceModule),
    forwardRef(() => ComponentInstancePropertyModule),
    forwardRef(() => PageModule),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class PagesModule {}
