import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { Module, forwardRef } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person..controller';
import { AdminModule } from '@hedhog/admin';

@Module({
  providers: [PersonService],
  exports: [PersonService],
  controllers: [PersonController],
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
})
export class PersonModule {}
