import { Role } from '@hedhog/admin';
import { Controller, Get } from '@nestjs/common';
import { CountryService } from './country.service';

@Role()
@Controller('/countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  async list() {
    return this.countryService.list();
  }
}
