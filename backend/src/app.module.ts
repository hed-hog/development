import { Module } from '@nestjs/common';
import { WalletModule } from '@hedhog/wallet';
import { TagModule } from '@hedhog/tag';
import { SubscriptionModule } from '@hedhog/subscription';
import { PaymentModule } from '@hedhog/payment';
import { RatingModule } from '@hedhog/rating';
import { RabbitmqModule } from '@hedhog/rabbitmq';
import { ProfileModule } from '@hedhog/profile';
import { PageModule } from '@hedhog/page';
import { FaqModule } from '@hedhog/faq';
import { ContentModule } from '@hedhog/content';
import { ContactUsModule } from '@hedhog/contact-us';
import { SettingModule } from '@hedhog/setting';
import { ChatModule } from '@hedhog/chat';
import { ContactModule } from '@hedhog/contact';
import { CountryModule } from '@hedhog/country';
import { CategoryModule } from '@hedhog/category';
import { AppearanceModule } from '@hedhog/appearance';
import { FileModule } from '@hedhog/file';
import { AdminModule } from '@hedhog/admin';
import { MailManagerModule } from '@hedhog/mail-manager';
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
      type: 'GMAIL',
      clientId: String(process.env.MAIL_CLIENT_ID),
      clientSecret: String(process.env.MAIL_CLIENT_SECRET),
      refreshToken: String(process.env.REFRESH_TOKEN),
      from: String(process.env.MAIL_FROM),
    }),
    MailManagerModule,
    AdminModule,
    FileModule,
    AppearanceModule,
    CategoryModule,
    CountryModule,
    ContactModule,
    ChatModule,
    SettingModule,
    ContactUsModule,
    ContentModule,
    FaqModule,
    PageModule,
    ProfileModule,
    RabbitmqModule,
    RatingModule,
    PaymentModule,
    SubscriptionModule,
    TagModule,
    WalletModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
