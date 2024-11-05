import { PrismaModule } from '@hedhog/prisma';
import { Module, forwardRef } from '@nestjs/common';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';

@Module({
  providers: [CountryService],
  exports: [CountryService],
  controllers: [CountryController],
  imports: [forwardRef(() => PrismaModule)],
})
export class CountryModule {}
