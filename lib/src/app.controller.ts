import {
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { MailService } from '@hedhog/mail';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly mailService: MailService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('send')
  @UseInterceptors(FilesInterceptor('files'))
  async testMail(@UploadedFiles() files: Express.Multer.File[]) {
    return this.mailService.send({
      to: ['anthonyribeiro1910@gmail.com', 'anthonyribeiro1910teste@gmail.com'],
      subject: 'Testando email 2',
      body: 'Testando 123',
      attachments: files.map((it) => {
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
