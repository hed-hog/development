import { PrismaModule } from '@hedhog/prisma';
import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PrismaModule, ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
