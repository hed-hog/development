import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from '@hadsys/auth';
import { MailModule } from '@app/mail';
import { MailConfigurationTypeEnum } from '@app/mail/enums/mail-configuration-type.enum';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // AuthModule,
    ConfigModule.forRoot(),
    MailModule.init({
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
      host: process.env.MAIL_HOST,
      from: process.env.MAIL_FROM,

      clientSecret: process.env.CLIENT_SECRET,
      clientId: process.env.CLIENT_ID,
      refreshToken: process.env.REFRESH_TOKEN,
      mailConfigurationType: MailConfigurationTypeEnum.GMAIL,
    })],
  controllers: [AppController],
  providers: [
    AppService,
    // PrismaService,
  ],
})
export class AppModule { }
