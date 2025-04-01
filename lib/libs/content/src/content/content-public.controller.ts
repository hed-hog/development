import { Public } from '@hedhog/core';
import { Locale } from '@hedhog/locale';
import { Controller, Get, Inject, Param, forwardRef } from '@nestjs/common';
import { ContentService } from './content.service';

@Public()
@Controller('content-public')
export class ContentPublicController {
  constructor(
    @Inject(forwardRef(() => ContentService))
    private readonly contentService: ContentService,
  ) {}

  @Get(':slug')
  async slug(@Param('slug') slug: string, @Locale() locale) {
    console.log('slug', slug);
    return this.contentService.getBySlug(slug, locale);
  }
}
