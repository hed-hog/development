import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthModule } from '@hedhog/auth';
import { UserController } from './user.controller';
import { PrismaModule } from '@hedhog/prisma';

@Module({
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
  imports: [AuthModule, PrismaModule],
})
export class UserModule {}
