import {
  Body,
  Controller,
  forwardRef,
  Get,
  Inject,
  Post,
} from '@nestjs/common';
import { Role } from '../role/decorators/role.decorator';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { User } from './decorators/user.decorator';
import { ForgetDTO } from './dto/forget.dto';
import { LoginDTO } from './dto/login.dto';
import { OtpDTO } from './dto/otp.dto';
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
  async forget(@Body() { email }: ForgetDTO) {
    return this.service.forget({ email });
  }
}
