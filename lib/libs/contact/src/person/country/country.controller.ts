import { Controller, Get } from '@nestjs/common';
import { CountryService } from './country.service';

@Controller('/country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  async getAll() {
    return this.countryService.getAll();
  }
}
