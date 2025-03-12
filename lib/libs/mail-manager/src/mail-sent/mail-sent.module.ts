import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { MailSentService } from './mail-sent.service';
import { MailSentController } from './mail-sent.controller';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule)
  ],
  controllers: [MailSentController],
  providers: [MailSentService],
  exports: [MailSentService]
})
export class MailSentModule {}
