import { AdminModule } from '@hedhog/admin';
import { AppearanceModule } from '@hedhog/appearance';
import { CbcModule } from '@hedhog/cbc';
import { ContactModule } from '@hedhog/contact';
import { CountryModule } from '@hedhog/country';
import { FaqModule } from '@hedhog/faq';
import { FileModule } from '@hedhog/file';
import { LocaleModule } from '@hedhog/locale';
import { MailModule } from '@hedhog/mail';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { SettingModule } from '@hedhog/setting';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CheckoutModule } from './../libs/payment/src/checkout/checkout.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    CheckoutModule,
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
    AppearanceModule,
    ContactModule,
    CountryModule,
    LocaleModule,
    SettingModule,
    FileModule,
    CbcModule,
    FaqModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
