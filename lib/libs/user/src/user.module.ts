import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthModule } from '@hedhog/auth';
import { UserController } from './user.controller';

@Module({
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
  imports: [AuthModule],
})
export class UserModule {}
