import { LocaleService } from '@hedhog/locale';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CountryService {
  constructor(private readonly localeService: LocaleService) {}

  async list() {
    return this.localeService.listModelWithLocale('country');
  }
}
