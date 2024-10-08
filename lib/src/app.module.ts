import { PrismaModule } from '@hedhog/prisma';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from '@hedhog/admin';
import { MailModule } from '@hedhog/mail';
import { PaginationModule } from '@hedhog/pagination';
import { PersonModule } from 'libs/person/src/person.module';
import { LocaleModule } from '@hedhog/locale';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot(),
    PaginationModule,
    MailModule.forRoot({
      global: true,
      type: 'SMTP',
      host: 'changeme',
      port: 465,
      secure: false,
      username: 'changeme',
      password: 'changeme',
    }),
    AdminModule,
    PersonModule,
    LocaleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
