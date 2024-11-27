import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { PersonTestService } from './person-test.service';
import { PersonTestController } from './person-test.controller';
@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule)
  ],
  controllers: [PersonTestController],
  providers: [PersonTestService],
  exports: [forwardRef(() => PersonTestService)]
})
export class PersonTestModule {}
