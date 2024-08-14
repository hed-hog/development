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

  @Post('send')
  async testMail() {
    return this.mailService.send({
      to: 'anthonyribeiro1910@gmail.com',
      subject: 'Testando email 2',
      body: 'Testando 123',
    });
  }
}
