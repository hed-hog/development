import { AdminModule } from '@hedhog/admin';
import { FileModule } from '@hedhog/file';
import { LocaleModule } from '@hedhog/locale';
import { MailModule } from '@hedhog/mail';
import { PaginationModule } from '@hedhog/pagination';
import { ContactModule } from '@hedhog/contact';
import { PrismaModule } from '@hedhog/prisma';
import { CountryModule } from '../libs/country/src/country.module';
import { SettingModule } from '@hedhog/setting';
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
      type: 'SMTP',
      host: 'changeme',
      port: 465,
      secure: false,
      username: 'changeme',
      password: 'changeme',
    }),
    AdminModule,
    ContactModule,
    CountryModule,
    LocaleModule,
    SettingModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
