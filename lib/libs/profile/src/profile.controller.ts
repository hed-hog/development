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
import { CloseAccountDTO } from './dto/close-account.dto';
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
    @User() { id },
  ) {
    return this.service.updateUserData(id, {
      email,
      name,
      telephone,
      address,
    });
  }

  @Post('close-account')
  async closeAccount(@Body() { password }: CloseAccountDTO, @User() { id }) {
    return this.service.closeAccount(id, { password });
  }

  @Get()
  async index(@User() { id }) {
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
        person_user: {
          include: {
            user: true,
          },
        },
      },
    });
  }
}
