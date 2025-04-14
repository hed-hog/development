import { AdminModule } from '@hedhog/admin';
import { MailModule as MailMainModule } from '@hedhog/mail';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { MailSentModule } from '../mail-sent/mail-sent.module';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => MailMainModule),
    forwardRef(() => MailSentModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
