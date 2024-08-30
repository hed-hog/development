import { AuthModule } from '@hedhog/auth';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
  imports: [AuthModule, PrismaModule, PaginationModule],
})
export class UserModule {}
