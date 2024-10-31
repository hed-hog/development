import { PrismaService } from '@hedhog/prisma';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LocaleMiddleware implements NestMiddleware {
  private languages = [];

  constructor(private prisma: PrismaService) {}

  async use(req: Request, _res: Response, next: NextFunction) {
    const locale = req.headers['accept-language'] || 'en-US';
    let code = locale.split(',')[0].split('-')[0];

    if (!this.languages.length) {
      const locale = await this.prisma.locale.findMany({
        select: {
          code: true,
        },
      });

      for (const l of locale) {
        this.languages.push(l.code);
      }
    }

    if (!this.languages.includes(code)) {
      code = 'en';
    }

    req['locale'] = code;
    next();
  }
}
