import { AdminModule } from '@hedhog/admin';
import { ContactModule } from '@hedhog/contact';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { MailModule } from '@hedhog/mail';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => ContactModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
    forwardRef(() => MailModule),
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule { }
