import { Module } from '@nestjs/common';
import { SettingsController } from './setting.controller';
import { SettingService } from './setting.service';

@Module({
  imports: [],
  controllers: [SettingsController],
  providers: [SettingService],
  exports: [SettingService],
})
export class SettingModule {}
