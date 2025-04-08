import { Public } from '@hedhog/core';
import { Body, Controller, Inject, Post, forwardRef } from '@nestjs/common';
import { ContactUsService } from './contact-us.service';
import { CreateDTO } from './dto/create.dto';

@Public()
@Controller('contact-us/public')
export class PublicController {
  constructor(
    @Inject(forwardRef(() => ContactUsService))
    private readonly contactUsService: ContactUsService,
  ) {}

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.contactUsService.create(data);
  }
}
