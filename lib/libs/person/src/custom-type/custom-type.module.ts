import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { Module, forwardRef } from '@nestjs/common';
import { CustomTypeController } from './custom-type.controller';
import { CustomTypeService } from './custom-type.service';
import { AuthModule } from '../../../admin/src/auth/auth.module';

@Module({
  providers: [CustomTypeService],
  exports: [CustomTypeService],
  controllers: [CustomTypeController],
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
})
export class CustomTypeModule {}
