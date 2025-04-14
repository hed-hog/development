import { Public } from '@hedhog/core';
import { Locale } from '@hedhog/locale';
import { Controller, Get, Inject, Param, forwardRef } from '@nestjs/common';
import { ContentPublicService } from './content-public.service';

@Public()
@Controller('content-public')
export class ContentPublicController {
  constructor(
    @Inject(forwardRef(() => ContentPublicService))
    private readonly contentPublicService: ContentPublicService,
  ) {}

  @Get(':slug')
  async slug(@Param('slug') slug: string, @Locale() locale) {
    console.log('slug', slug);
    return this.contentPublicService.getBySlug(slug, locale);
  }
}
