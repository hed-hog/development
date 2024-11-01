import { FileModule } from '@hedhog/file';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { SettingsController } from './setting.controller';
import { SettingService } from './setting.service';

@Module({
  providers: [SettingService],
  exports: [SettingService],
  controllers: [SettingsController],
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
    forwardRef(() => FileModule),
  ],
})
export class SettingModule {}
