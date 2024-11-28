import { LocaleService } from '@hedhog/locale';
import { PaginationDTO } from '@hedhog/pagination';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CountryService {
  constructor(private readonly localeService: LocaleService) {}

  async list(locale: string, paginationParams: PaginationDTO) {
    return this.localeService.listModelWithLocale(
      locale,
      'country',
      paginationParams,
    );
  }
}
