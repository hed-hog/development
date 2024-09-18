import { AuthModule } from '@hedhog/auth';
import { MailConfigurationTypeEnum, MailModule } from '@hedhog/mail';
import { PrismaModule } from '@hedhog/prisma';
import { UserModule } from '@hedhog/user';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScreenModule } from '@hedhog/screen';
import { PermissionModule } from '@hedhog/permission';
import { SettingModule } from 'libs/setting/src';
import { FileModule } from '@hedhog/file';
import { MenuModule } from '@hedhog/menu';

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
