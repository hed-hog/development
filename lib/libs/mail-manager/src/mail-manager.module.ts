import { AdminModule } from '@hedhog/admin';
import { MailModule as MailMainModule } from '@hedhog/mail';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { MailSentModule } from './mail-sent/mail-sent.module';
import { MailVarModule } from './mail-var/mail-var.module';
import { MailModule } from './mail/mail.module';
import { MailService as MailMainService } from './mail/mail.service';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => MailMainModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
    forwardRef(() => MailModule),
    forwardRef(() => MailSentModule),
    forwardRef(() => MailVarModule),
  ],
  controllers: [],
  providers: [MailMainService],
  exports: [MailMainService],
})
export class MailManagerModule {}
