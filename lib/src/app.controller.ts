import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MailService } from '@app/mail';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly mailService: MailService,
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  async testMail() {
    return this.mailService.send();
  }
}
