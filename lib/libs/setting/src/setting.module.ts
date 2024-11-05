import { FileModule } from '@hedhog/file';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { Module, forwardRef } from '@nestjs/common';
import { SettingsController } from './setting/setting.controller';
import { SettingService } from './setting/setting.service';
import { LocaleModule } from '@hedhog/locale';

@Module({
  providers: [SettingService],
  exports: [SettingService],
  controllers: [SettingsController],
  imports: [
    forwardRef(() => LocaleModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
    forwardRef(() => FileModule),
  ],
})
export class SettingModule {}
