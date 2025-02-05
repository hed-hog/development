import { Module } from '@nestjs/common';
import { CbcModule } from '@hedhog/cbc';
import { SubscriptionModule } from '@hedhog/subscription';
import { RabbitmqModule } from '@hedhog/rabbitmq';
import { PaymentModule } from '@hedhog/payment';
import { FaqModule } from '@hedhog/faq';
import { ContactModule } from '@hedhog/contact';
import { FileModule } from '@hedhog/file';
import { SettingModule } from '@hedhog/setting';
import { CountryModule } from '@hedhog/country';
import { AdminModule } from '@hedhog/admin';
import { LocaleModule } from '@hedhog/locale';
import { PaginationModule } from '@hedhog/pagination';
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
    FaqModule,
    PaymentModule,
    RabbitmqModule,
    SubscriptionModule,
    CbcModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
