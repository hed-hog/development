import { Pagination } from '@hedhog/pagination';
import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  forwardRef,
} from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { DeleteDTO } from '../dto/delete.dto';
import { UpdateDTO } from './dto/update.dto';
import { SettingsService } from './settings.service';
import { Locale } from '../locale';
import { SettingsDTO } from './dto/settings.dto';
import { User } from '../auth/decorators/user.decorator';
import { SettingUserDTO } from './dto/setting-user.dto';

@Controller('settings')
export class SettingsController {
  constructor(
    @Inject(forwardRef(() => SettingsService))
    private readonly settingsService: SettingsService,
  ) {}

  @Get('groups/:slug')
  async getSettingFromGroup(
    @Pagination() paginationParams,
    @Locale() locale,
    @Param('slug') slug: string,
  ) {
    return this.settingsService.getSettingFromGroup(
      locale,
      paginationParams,
      slug,
    );
  }

  @Get('groups')
  async getSettingGroups(@Pagination() paginationParams, @Locale() locale) {
    return this.settingsService.getSettingGroups(locale, paginationParams);
  }

  @Get()
  async getSettings(@Pagination() paginationParams, @Locale() locale) {
    return this.settingsService.getSettings(locale, paginationParams);
  }

  @Get(':settingId')
  async show(@Param('settingId', ParseIntPipe) settingId: number) {
    return this.settingsService.get(settingId);
  }

  @Post()
  create(@Body() data: CreateDTO) {
    return this.settingsService.create(data);
  }

  @Put('users/:slug')
  async updateUserFromSlug(
    @Param('slug') slug: string,
    @Body() { value }: SettingUserDTO,
    @User() { id },
  ) {
    return this.settingsService.setSettingUserValue(id, slug, value);
  }

  @Put(':slug')
  async updateFromSlug(@Param('slug') slug: string, @Body() data: UpdateDTO) {
    return this.settingsService.updateFromSlug(slug, data);
  }

  @Put()
  async setManySettings(@Body() data: SettingsDTO) {
    return this.settingsService.setManySettings(data);
  }

  @Patch(':settingId')
  async update(
    @Param('settingId', ParseIntPipe) settingId: number,
    @Body() data: UpdateDTO,
  ) {
    return this.settingsService.update({
      id: settingId,
      data,
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.settingsService.delete(data);
  }
}
