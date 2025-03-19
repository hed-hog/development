import { Module } from '@nestjs/common';
import { SubscriptionModule } from '@hedhog/subscription';
import { PaymentModule } from '@hedhog/payment';
import { RabbitmqModule } from '@hedhog/rabbitmq';
import { ProfileModule } from '@hedhog/profile';
import { PageModule } from '@hedhog/page';
import { FaqModule } from '@hedhog/faq';
import { DashboardModule } from '@hedhog/dashboard';
import { ContentModule } from '@hedhog/content';
import { ChatModule } from '@hedhog/chat';
import { ContactModule } from '@hedhog/contact';
import { CountryModule } from '@hedhog/country';
import { AppearanceModule } from '@hedhog/appearance';
import { FileModule } from '@hedhog/file';
import { SettingModule } from '@hedhog/setting';
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
    SettingModule,
    FileModule,
    AppearanceModule,
    CountryModule,
    ContactModule,
    ChatModule,
    ContentModule,
    DashboardModule,
    FaqModule,
    PageModule,
    ProfileModule,
    RabbitmqModule,
    PaymentModule,
    SubscriptionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
