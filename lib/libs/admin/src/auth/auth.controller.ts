import { Public, Role, User } from '@hedhog/core';
import { Locale } from '@hedhog/locale';
import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  Inject,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ChangeDTO } from './dto/change.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { EmailDTO } from './dto/email.dto';
import { ForgetDTO } from './dto/forget.dto';
import { LoginWithCodeDTO } from './dto/login-with-code.dto';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { ResetDTO } from './dto/reset.dto';
import { User as UserType } from './types/user.type';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly service: AuthService,
  ) { }

  @Public()
  @Get('create-user')
  async createUserCheck(@Query('code') code: string) {
    return this.service.createUserCheck(code);
  }

  @Public()
  @Post('create-user')
  async createUser(@Locale() Locale, @Body() data: CreateUserDTO) {
    return this.service.createUser(Locale, data);
  }

  @Role()
  @Get('verify')
  async verify(@User() { id }: UserType) {
    return this.service.verify(id);
  }

  @Public()
  @Post('login')
  async login(@Locale() locale: string, @Body() { email, password }: LoginDTO) {
    return this.service.login(locale, { email, password });
  }

  @Public()
  @Post('register')
  async register(
    @Body() { email, password, name, code, multifactor_id }: RegisterDTO,
  ) {
    return this.service.register({
      email,
      password,
      name,
      code,
      multifactor_id,
    });
  }

  @Public()
  @Post('login-code')
  async loginCode(@Body() { token, code }: LoginWithCodeDTO) {
    return this.service.loginCode({ token, code });
  }

  @Public()
  @Post('login-recovery-code')
  async loginRecoveryCode(@Body() { token, code }: LoginWithCodeDTO) {
    return this.service.loginRecoveryCode({ token, code });
  }

  @Public()
  @Post('forget')
  async forget(
    @Locale() locale: string,
    @Body()
    {
      email,
    }: ForgetDTO & {
      subject: string;
      body: string;
    },
  ) {
    return this.service.forget(locale, {
      email,
    });
  }

  @Public()
  @Post('reset')
  async reset(
    @Locale() locale: string,
    @Body() { newPassword, confirmNewPassword, code }: ResetDTO,
  ) {
    return this.service.resetPassword(locale, {
      newPassword,
      confirmNewPassword,
      code,
    });
  }

  @Public()
  @Post('change-password')
  async changePassword(
    @Locale() locale: string,
    @Body()
    { email, currentPassword, newPassword, confirmNewPassword }: ChangeDTO,
  ) {
    return this.service.changePassword(locale, {
      email,
      currentPassword,
      newPassword,
      confirmNewPassword,
    });
  }

  @Post('change-email')
  async changeEmail(
    @Locale() locale: string,
    @Body() { currentEmail, password, newEmail }: EmailDTO,
  ) {
    return this.service.changeEmail(locale, {
      currentEmail,
      password,
      newEmail,
    });
  }

  @Delete('mfa-remove')
  async removeMfa(@User() { id }, @Body() { token }: { token: string }) {
    return this.service.removeMfa(id, token);
  }

  @Post('mfa-generate')
  async generateMfa(@User() { id }) {
    return this.service.generateMfa(id);
  }

  @Public()
  @Post('mfa-verify')
  async verifyMfa(@Body() { token, email }: { token: string; email: string }) {
    return this.service.verifyMfa(email, token, false);
  }

  @Public()
  @Get('google/login')
  async loginGoogle(@Res() res) {
    return this.service.loginGoogle(res);
  }

  @Public()
  @Get('google/callback')
  async callbackGoogle(@Query() { code }: { code: string }) {
    return this.service.callbackGoogle(code);
  }

  @Public()
  @Get('facebook/login')
  async loginFacebook(@Res() res) {
    return this.service.loginFacebook(res);
  }

  @Public()
  @Get('facebook/callback')
  async callbackFacebook(@Query() { code }: { code: string }) {
    return this.service.callbackFacebook(code);
  }
}
