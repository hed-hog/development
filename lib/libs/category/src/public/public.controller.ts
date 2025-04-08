import { Public } from '@hedhog/core';
import { Locale } from '@hedhog/locale';
import { Pagination } from '@hedhog/pagination';
import { Controller, Get } from '@nestjs/common';
import { CategoryService } from '../category/category.service';

@Public()
@Controller('category-public')
export class PublicController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async list(@Locale() locale, @Pagination() paginationParams) {
    return this.categoryService.list(locale, paginationParams);
  }
}
