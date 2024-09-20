import { PrismaModule } from '@hedhog/prisma';
import { AuthModule } from '@hedhog/admin';
import {
  MailConfigurationTypeEnum,
  MailModule,
  UserModule,
  ScreenModule,
  PermissionModule,
  SettingModule,
  FileModule,
  MenuModule,
} from '@hedhog/admin';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PrismaModule,
    ScreenModule,
    PermissionModule,
    SettingModule,
    FileModule,
    MenuModule,
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
