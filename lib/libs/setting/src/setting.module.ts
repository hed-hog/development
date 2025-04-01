import { LocaleModule } from '@hedhog/locale';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { Module, forwardRef } from '@nestjs/common';
import { SettingsController } from '../../admin/src/setting/setting.controller';
import { SettingService } from '../../admin/src/setting/setting.service';

@Module({
  providers: [SettingService],
  exports: [SettingService],
  controllers: [SettingsController],
  imports: [
    forwardRef(() => LocaleModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
})
export class SettingModule {}
