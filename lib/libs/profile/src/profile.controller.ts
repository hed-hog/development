import { Public, User } from '@hedhog/core';
import { PrismaService } from '@hedhog/prisma';
import {
  Body,
  Controller,
  forwardRef,
  Get,
  Inject,
  Post,
} from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { SignupDTO } from './dto/signup.dto';
import { UpdateUserDataDTO } from './dto/update.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(
    private readonly prismaService: PrismaService,
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

  @Post('close-account')
  async closeAccount(@Body() { email, password }: LoginDTO) {
    return this.service.closeAccount({ email, password });
  }

  @Get('user')
  async user(@User() { id }) {
    return this.prismaService.person.findFirst({
      where: {
        person_user: {
          some: {
            user_id: id,
          },
        },
      },
      include: {
        person_contact: true,
        person_document: true,
        person_address: true,
      },
    });
  }
}
