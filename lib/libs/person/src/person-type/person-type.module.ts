import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { Module, forwardRef } from '@nestjs/common';
import { PersonTypeController } from './person-type.controller';
import { PersonTypeService } from './person-type.service';
import { AuthModule } from '../../../admin/src/auth/auth.module';

@Module({
  providers: [PersonTypeService],
  exports: [PersonTypeService],
  controllers: [PersonTypeController],
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
})
export class PersonTypeModule {}
