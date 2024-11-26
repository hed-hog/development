import { forwardRef, Module } from '@nestjs/common';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { LocaleModule } from '@hedhog/locale';
@Module({
  imports: [forwardRef(() => LocaleModule)],
  controllers: [CountryController],
  providers: [CountryService],
  exports: [forwardRef(() => CountryService)],
})
export class CountryModule {}
