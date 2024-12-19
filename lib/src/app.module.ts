import { AdminModule } from '@hedhog/admin';
import { FileModule } from '@hedhog/file';
import { LocaleModule } from '@hedhog/locale';
import { MailModule } from '@hedhog/mail';
import { PaginationModule } from '@hedhog/pagination';
import { ContactModule } from '@hedhog/contact';
import { PrismaModule } from '@hedhog/prisma';
import { CountryModule } from '@hedhog/country';
import { SettingModule } from '@hedhog/setting';
import { CbcModule } from '@hedhog/cbc';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`, // Carrega o arquivo com base no NODE_ENV
      isGlobal: true, // Torna o ConfigModule global (não precisa importar em cada módulo)
    }),
    PaginationModule,
    MailModule.forRoot({
      global: true,
      type: 'GMAIL',
      clientId: String(process.env.MAIL_CLIENT_ID),
      clientSecret: String(process.env.MAIL_CLIENT_SECRET),
      refreshToken: String(process.env.REFRESH_TOKEN),
      from: String(process.env.MAIL_FROM),
    }),
    AdminModule,
    ContactModule,
    CountryModule,
    LocaleModule,
    SettingModule,
    FileModule,
    CbcModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
