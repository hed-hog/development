import { Controller, Get } from '@nestjs/common';
import { CountryService } from './country.service';
import { Locale } from '@hedhog/locale';
import { Pagination } from '@hedhog/pagination';

@Controller('/country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  async list(@Locale() locale, @Pagination() paginationParams) {
    return this.countryService.list(locale, paginationParams);
  }
}
