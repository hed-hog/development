import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { CategoryModule as CategoryModule2 } from './category/category.module';
import { PublicModule } from './public/public.module';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
    forwardRef(() => CategoryModule2),
    forwardRef(() => PublicModule),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class CategoryModule {}
