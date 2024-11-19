import { LocaleService } from '@hedhog/locale';
import { PrismaService } from '@hedhog/prisma';
import { Injectable } from '@nestjs/common';
import { count } from 'console';

@Injectable()
export class CountryService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly localeService: LocaleService,
  ) {}

  async getAll() {
    // Fetch the enabled locales map
    const localeMap = await this.localeService.enabledLocalesMap();

    // Fetch countries with their locales
    const result = await this.prismaService.country.findMany({
      include: {
        country_locale: true,
      },
    });

    // If no countries are found, return null
    if (!result || result.length === 0) {
      return null;
    }

    // Map through the countries to construct the response object
    const countries = result.map((country) => {
      const locale = country.country_locale.reduce((acc, localeData) => {
        // Find the corresponding locale code from the localeMap
        const localeCode = Object.keys(localeMap).find(
          (code) => localeMap[code] === localeData.locale_id,
        );

        // If a valid locale code is found, add it to the accumulator
        if (localeCode) {
          acc[localeCode] = { name: localeData.name };
        }
        return acc;
      }, {});

      // Return the country data along with its locales
      return {
        id: country.id,
        slug: country.code, // Ensure you include any other fields you need
        created_at: country.created_at,
        updated_at: country.updated_at,
        locale, // The locale object we created
      };
    });

    return countries;
  }
}
