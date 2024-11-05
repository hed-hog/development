import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { Module, forwardRef } from '@nestjs/common';
import { CustomController } from './custom.controller';
import { CustomService } from './custom.service';
import { AdminModule } from '@hedhog/admin';

@Module({
  providers: [CustomService],
  exports: [CustomService],
  controllers: [CustomController],
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
})
export class CustomModule {}
