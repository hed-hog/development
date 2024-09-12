import { forwardRef, Module } from '@nestjs/common';
import { FileService } from './file.service';
import { AuthModule } from '@hedhog/auth';
import { PrismaModule } from '@hedhog/prisma';
import { PaginationModule } from '@hedhog/pagination';

@Module({
  imports: [forwardRef(() => PrismaModule), forwardRef(() => PaginationModule)],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
