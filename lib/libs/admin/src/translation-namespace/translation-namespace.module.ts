import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { TranslationNamespaceService } from './translation-namespace.service';
import { TranslationNamespaceController } from './translation-namespace.controller';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule)
  ],
  controllers: [TranslationNamespaceController],
  providers: [TranslationNamespaceService],
  exports: [TranslationNamespaceService]
})
export class TranslationNamespaceModule {}
