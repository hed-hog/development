import { AdminModule } from '@hedhog/admin';
import { CbcModule } from '@hedhog/cbc';
import { ContactModule } from '@hedhog/contact';
import { CountryModule } from '@hedhog/country';
import { FileModule } from '@hedhog/file';
import { LocaleModule } from '@hedhog/locale';
import { MailModule } from '@hedhog/mail';
import { PaginationModule } from '@hedhog/pagination';
import { PaymentModule } from '@hedhog/payment';
import { PrismaModule } from '@hedhog/prisma';
import { SettingModule } from '@hedhog/setting';
import { SubscriptionModule } from '@hedhog/subscription';
import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [
    PrismaModule,
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }]),
    MailModule.forRoot({
      global: true,
      type: 'GMAIL',
      clientId: String(process.env.MAIL_CLIENT_ID),
      clientSecret: String(process.env.MAIL_CLIENT_SECRET),
      refreshToken: String(process.env.REFRESH_TOKEN),
      from: String(process.env.MAIL_FROM),
    }),
    PaginationModule,
    LocaleModule,
    AdminModule,
    CountryModule,
    SettingModule,
    FileModule,
    ContactModule,
    PaymentModule,
    SubscriptionModule,
    CbcModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
