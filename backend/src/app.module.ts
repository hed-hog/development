import { Module } from '@nestjs/common';
import { ContactModule } from '@hedhog/contact';
import { FileModule } from '@hedhog/file';
import { CountryModule } from '@hedhog/country';
import { CbcModule } from '@hedhog/cbc';
import { AdminModule } from '@hedhog/admin';
import { SettingModule } from '@hedhog/setting';
import { MailModule } from '@hedhog/mail';
import { LocaleModule } from '@hedhog/locale';
import { PaginationModule } from '@hedhog/pagination';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from '@hedhog/prisma';

@Module({
  imports: [
    PrismaModule,
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }]),
    PaginationModule,
    LocaleModule,
    MailModule.forRoot({
      global: true,
      type: 'SMTP',
      host: 'changeme',
      port: 465,
      secure: false,
      username: 'changeme',
      password: 'changeme',
    }),
    SettingModule,
    AdminModule,
    CbcModule,
    CountryModule,
    FileModule,
    ContactModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
