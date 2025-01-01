import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { MultifactorService } from './multifactor.service';
import { MultifactorController } from './multifactor.controller';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule)
  ],
  controllers: [MultifactorController],
  providers: [MultifactorService],
  exports: [MultifactorService]
})
export class MultifactorModule {}
