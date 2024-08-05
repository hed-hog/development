import { AuthController } from './../libs/auth/src/auth.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [],
  controllers: [AuthController, AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
