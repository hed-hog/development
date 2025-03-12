import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { MailVarService } from './mail-var.service';
import { MailVarController } from './mail-var.controller';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule)
  ],
  controllers: [MailVarController],
  providers: [MailVarService],
  exports: [MailVarService]
})
export class MailVarModule {}
