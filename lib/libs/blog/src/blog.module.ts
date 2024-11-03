import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';
import { AuthorModule } from './author/author.module';
import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
    forwardRef(() => AuthorModule),
    forwardRef(() => CategoryModule),
    forwardRef(() => PostModule),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class BlogModule {}
