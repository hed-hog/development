import { Public, Role, User } from '@hedhog/core';
import {
  Body,
  Controller,
  forwardRef,
  Get,
  Inject,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ChangeDTO } from './dto/change.dto';
import { EmailDTO } from './dto/email.dto';
import { ForgetDTO } from './dto/forget.dto';
import { LoginDTO } from './dto/login.dto';
import { OtpDTO } from './dto/otp.dto';
import { ResetDTO } from './dto/reset.dto';
import { User as UserType } from './types/user.type';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly service: AuthService,
  ) {}

  @Role()
  @Get('verify')
  async verify(@User() { id }: UserType) {
    return this.service.verify(id);
  }

  @Public()
  @Post('login')
  async login(@Body() { email, password }: LoginDTO) {
    return this.service.login({ email, password });
  }

  @Public()
  @Post('otp')
  async otp(@Body() { token, code }: OtpDTO) {
    return this.service.otp({ token, code });
  }

  @Public()
  @Post('forget')
  async forget(
    @Body()
    {
      email,
      subject,
      body,
    }: ForgetDTO & {
      subject: string;
      body: string;
    },
  ) {
    return this.service.forget({
      email,
      subject,
      body,
    });
  }

  @Public()
  @Post('reset')
  async reset(@Body() { newPassword, confirmNewPassword, code }: ResetDTO) {
    return this.service.resetPassword({
      newPassword,
      confirmNewPassword,
      code,
    });
  }

  @Public()
  @Post('change-password')
  async changePassword(
    @Body()
    { email, currentPassword, newPassword, confirmNewPassword }: ChangeDTO,
  ) {
    return this.service.changePassword({
      email,
      currentPassword,
      newPassword,
      confirmNewPassword,
    });
  }

  @Public()
  @Post('change-email')
  async changeEmail(@Body() { currentEmail, password, newEmail }: EmailDTO) {
    return this.service.changeEmail({ currentEmail, password, newEmail });
  }
}
