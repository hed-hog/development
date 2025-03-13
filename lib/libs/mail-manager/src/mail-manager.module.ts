import { MailVarModule } from './mail-var/mail-var.module';
import { MailSentModule } from './mail-sent/mail-sent.module';
import { MailModule } from './mail/mail.module';
import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
    forwardRef(() => MailModule),
    forwardRef(() => MailSentModule),
    forwardRef(() => MailVarModule),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class MailManagerModule {}
