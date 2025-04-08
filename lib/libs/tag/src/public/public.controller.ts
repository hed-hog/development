import { Public } from '@hedhog/core';
import { Locale } from '@hedhog/locale';
import { Pagination } from '@hedhog/pagination';
import { Controller, Get } from '@nestjs/common';
import { TagService } from '../tag/tag.service';

@Public()
@Controller('tag-public')
export class PublicController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async list(@Locale() locale, @Pagination() paginationParams) {
    return this.tagService.list(locale, paginationParams);
  }
}
