import { AuthModule } from '@hedhog/auth';
import { PrismaModule } from '@hedhog/prisma';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PaginationModule } from '@hedhog/pagination';

@Module({
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
  imports: [AuthModule, PrismaModule, PaginationModule],
})
export class UserModule {}
