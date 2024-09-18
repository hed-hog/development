import { MailService } from '@hedhog/mail';
import {
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { Public } from '@hedhog/auth';

@Public()
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private mailService: MailService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('send')
  @UseInterceptors(FilesInterceptor('files'))
  async testMail(@UploadedFiles() files: Express.Multer.File[]) {
    return this.mailService.send({
      to: ['joaohcrangel@gmail.com'],
      subject: `Testando email enviado às ${new Date().toISOString()}`,
      body: 'Testando 123',
      attachments: (files ?? []).map((it) => {
        return {
          ...it,
          contentType: it.mimetype,
          content: it.buffer,
          filename: it.originalname,
        };
      }),
    });
  }
}
