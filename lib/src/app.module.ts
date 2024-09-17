import { AuthModule } from '@hedhog/auth';
import { MailConfigurationTypeEnum, MailModule } from '@hedhog/mail';
import { PrismaModule } from '@hedhog/prisma';
import { UserModule } from '@hedhog/user';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PrismaModule,
    ConfigModule.forRoot(),
    MailModule.forRoot({
      type: MailConfigurationTypeEnum.SMTP,
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      password: 'AST7ZFbRWWNeAfqBaa',
      username: 'loyal.mante34@ethereal.email',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
