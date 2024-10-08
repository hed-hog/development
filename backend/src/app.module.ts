import { Module } from '@nestjs/common';
import { PaginationModule } from '@hedhog/pagination';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '@hedhog/prisma';

@Module({
  imports: [PrismaModule, PaginationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
