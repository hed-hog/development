import { Module } from '@nestjs/common';
import { BlogModule } from '@hedhog/blog';
import { AdminModule } from '@hedhog/admin';
import { MailModule } from '@hedhog/mail';
import { FileModule } from '@hedhog/file';
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
    FileModule,
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
    BlogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
