import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { PublicModule } from './public/public.module';
import { TagModule as TagModule2 } from './tag/tag.module';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
    forwardRef(() => TagModule2),
    forwardRef(() => PublicModule),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class TagModule {}
