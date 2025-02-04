import { Public } from '@hedhog/core';
import { Body, Controller, forwardRef, Inject, Post } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { LoginDTO } from './dto/login.dto';
import { SignupDTO } from './dto/signup.dto';
import { UpdateUserDataDTO } from './dto/update.dto';

@Controller('profile')
export class ProfileController {
  constructor(
    @Inject(forwardRef(() => ProfileService))
    private readonly service: ProfileService,
  ) {}

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

  @Public()
  @Post('update')
  async updateUserData(
    @Body() { email, name, telephone, address }: UpdateUserDataDTO,
  ) {
    return this.service.updateUserData({
      email,
      name,
      telephone,
      address,
    });
  }

  @Public()
  @Post('close-account')
  async closeAccount(@Body() { email, password }: LoginDTO) {
    return this.service.closeAccount({ email, password });
  }
}
