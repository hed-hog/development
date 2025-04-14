import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { ContentPublicController } from './content-public.controller';
import { ContentPublicService } from './content-public.service';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
  controllers: [ContentController, ContentPublicController],
  providers: [ContentService, ContentPublicService],
  exports: [],
})
export class ContentModule {}
