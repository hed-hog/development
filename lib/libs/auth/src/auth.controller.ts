import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { OtpDTO } from './dto/otp.dto';
import { ForgetDTO } from './dto/forget.dto';
import { Public } from './decorators/public.decorator';
import { User } from './decorators/user.decorator';
import { User as UserType } from './types/user.type';

@Controller('auth')
export class AuthController {

  constructor(private readonly service: AuthService) { }

  @Get('verify')
  async verify(@User() { id }: UserType) {
    return this.service.verify(id);
  }

  @Public()
  @Post('login')
  async login(@Body() { email, password }: LoginDTO) {
    return this.service.login({ email, password })
  }

  @Post('otp')
  async otp(@Body() { token, code }: OtpDTO) {
    return this.service.otp({ token, code })
  }

  @Public()
  @Post('forget')
  async forget(@Body() { email }: ForgetDTO) {
    return this.service.forget({ email })
  }
}
