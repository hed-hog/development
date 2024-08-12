import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from '@hadsys/auth';
import { MailModule } from '@app/mail';

@Module({
  imports: [AuthModule, MailModule.init({
    test: 'ok',
  })],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
