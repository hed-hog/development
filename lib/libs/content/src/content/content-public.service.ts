import { LocaleService } from '@hedhog/locale';
import { Inject, Injectable, forwardRef } from '@nestjs/common';

@Injectable()
export class ContentPublicService {
  private readonly modelName = 'content';

  constructor(
    @Inject(forwardRef(() => LocaleService))
    private readonly localeService: LocaleService,
  ) {}

  async getBySlug(slug: string, locale: string) {
    return this.localeService.getModelWithCurrentLocaleWhere(
      this.modelName,
      {
        slug,
      },
      locale,
    );
  }
}
