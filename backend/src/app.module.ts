import { Module } from '@nestjs/common';
import { FileModule } from '@hedhog/file';
import { SettingModule } from '@hedhog/setting';
import { PermissionModule } from '@hedhog/permission';
import { UserModule } from '@hedhog/user';
import { MenuModule } from '@hedhog/menu';
import { ScreenModule } from '@hedhog/screen';
import { PaginationModule } from '@hedhog/pagination';
import { AuthModule } from '@hedhog/auth';
import { MailModule } from '@hedhog/mail';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from '@hedhog/prisma';

@Module({
  imports: [
    PrismaModule,
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }]),
    MailModule.forRoot({
      global: true,
      type: 'SMTP',
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      username: 'coby60@ethereal.email',
      password: '16JQu4vTux7DRGaBmr',
    }),
    AuthModule,
    PaginationModule,
    ScreenModule,
    MenuModule,
    UserModule,
    PermissionModule,
    SettingModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
