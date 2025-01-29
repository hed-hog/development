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
import { ForgetDTO } from './dto/forget.dto';
import { LoginDTO } from './dto/login.dto';
import { OtpDTO } from './dto/otp.dto';
import { ResetDTO } from './dto/reset.dto';
import { SignupDTO } from './dto/signup.dto';
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
  @Post('signup')
  async signup(
    @Body()
    {
      fullName,
      cpf,
      email,
      password,
      city,
      district,
      postal_code,
      state,
      street,
      telephone,
      number,
    }: SignupDTO,
  ) {
    return this.service.signup({
      fullName,
      cpf,
      email,
      password,
      city,
      district,
      postal_code,
      state,
      street,
      telephone,
      number,
    });
  }
}
