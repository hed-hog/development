import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { Module, forwardRef } from '@nestjs/common';
import { ContactTypeController } from './contact-type.controller';
import { ContactTypeService } from './contact-type.service';
import { AuthModule } from '../../../admin/src/auth/auth.module';

@Module({
  providers: [ContactTypeService],
  exports: [ContactTypeService],
  controllers: [ContactTypeController],
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
})
export class ContactTypeModule {}
