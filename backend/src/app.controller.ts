import { Controller, Get } from '@nestjs/common';
import { Public } from '@hedhog/admin';
import { AppService } from './app.service';
import { Public } from '@hedhog/utils';

@Public()
@Public()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }
}
