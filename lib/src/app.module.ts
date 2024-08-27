import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@hedhog/auth';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@hedhog/prisma';
import { UserModule } from '@hedhog/user';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot(),
    // MailModule.init({
    //   accessKeyId: process.env.ACCESS_KEY_ID,
    //   secretAccessKey: process.env.SECRET_ACCESS_KEY,
    //   host: process.env.MAIL_HOST,
    //   from: process.env.MAIL_FROM,

    //   clientSecret: process.env.CLIENT_SECRET,
    //   clientId: process.env.CLIENT_ID,
    //   refreshToken: process.env.REFRESH_TOKEN,
    //   mailConfigurationType: MailConfigurationTypeEnum.GMAIL,
    // }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
