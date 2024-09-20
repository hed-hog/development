import { MailService } from '@hedhog/admin';
import {
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { Public } from '@hedhog/admin';
import { HttpAdapterHost } from '@nestjs/core';

@Public()
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private mailService: MailService,
    private readonly httpAdapterHost: HttpAdapterHost,
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

  @Get('routes')
  getEndpoints() {
    const httpServer = this.httpAdapterHost.httpAdapter.getInstance();

    if (httpServer._events) {
      // Fastify
      return this.getEndpointsFromFastify(httpServer);
    } else if (httpServer._router) {
      // Express
      return this.getEndpointsFromExpress(httpServer);
    } else {
      throw new Error('Unknown HTTP server');
    }
  }

  private getEndpointsFromExpress(server: any) {
    const router = server._router;
    const endpoints = [];

    router.stack.forEach((layer) => {
      if (layer.route) {
        const path = layer.route?.path;
        const methods = Object.keys(layer.route.methods)
          .filter((method) => layer.route.methods[method])
          .map((method) => method.toUpperCase());
        endpoints.push({ path, methods });
      }
    });

    return endpoints;
  }

  private getEndpointsFromFastify(server: any) {
    const endpoints = [];

    server.routes.forEach((route) => {
      const { url, method } = route;
      endpoints.push({ path: url, methods: [method] });
    });

    return endpoints;
  }
}
