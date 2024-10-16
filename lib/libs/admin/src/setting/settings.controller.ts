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
  UseGuards,
  forwardRef,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Role } from '../role/decorators/role.decorator';
import { CreateDTO } from './dto/create.dto';
import { DeleteDTO } from '../dto/delete.dto';
import { UpdateDTO } from './dto/update.dto';
import { SettingsService } from './settings.service';
import { Locale } from '../locale';

@Role()
@Controller('settings')
export class SettingsController {
  constructor(
    @Inject(forwardRef(() => SettingsService))
    private readonly settingsService: SettingsService,
  ) {}

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
  @Get('groups')
  async getSettingGroups(@Pagination() paginationParams, @Locale() locale) {
    return this.settingsService.getSettingGroups(locale, paginationParams);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getSettings(@Pagination() paginationParams, @Locale() locale) {
    return this.settingsService.getSettings(locale, paginationParams);
  }

  @UseGuards(AuthGuard)
  @Get(':settingId')
  async show(@Param('settingId', ParseIntPipe) settingId: number) {
    return this.settingsService.get(settingId);
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() data: CreateDTO) {
    return this.settingsService.create(data);
  }

  @UseGuards(AuthGuard)
  @Put(':slug')
  async updateFromSlug(@Param('slug') slug: string, @Body() data: UpdateDTO) {
    return this.settingsService.updateFromSlug(slug, data);
  }

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.settingsService.delete(data);
  }
}
