import { RatingModule as RatingModule2 } from './rating/rating.module';
import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
    forwardRef(() => RatingModule2),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class RatingModule {}
