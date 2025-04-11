import { Public, Role, User } from '@hedhog/core';
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
  ) {}

  @Public()
  @Get('create-user')
  async createUserCheck(@Query('code') code: string) {
    return this.service.createUserCheck(code);
  }

  @Public()
  @Post('create-user')
  async createUser(@Body() data: CreateUserDTO) {
    return this.service.createUser(data);
  }

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
    @Body()
    {
      email,
    }: ForgetDTO & {
      subject: string;
      body: string;
    },
  ) {
    return this.service.forget({
      email,
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

  @Post('change-email')
  async changeEmail(@Body() { currentEmail, password, newEmail }: EmailDTO) {
    return this.service.changeEmail({ currentEmail, password, newEmail });
  }

  @Delete('mfa-remove')
  async removeMfa(@User() { id }, @Body() { token }: { token: string }) {
    return this.service.removeMfa(id, token);
  }

  @Post('mfa-generate')
  async generateMfa(@User() { id }) {
    return this.service.generateMfa(id);
  }

  @Post('mfa-verify')
  async verifyMfa(@User() { id }, @Body() { token }: { token: string }) {
    console.log('mfa-verify');
    return this.service.verifyMfa(id, token);
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
}
