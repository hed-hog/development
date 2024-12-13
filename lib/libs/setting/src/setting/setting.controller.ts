import { Public, Role, User } from '@hedhog/core';
import { Locale } from '@hedhog/locale';
import { Pagination } from '@hedhog/pagination';
import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { DeleteDTO } from './dto/delete.dto';
import { SettingUserDTO } from './dto/setting-user.dto';
import { SettingDTO } from './dto/setting.dto';
import { UpdateDTO } from './dto/update.dto';
import { SettingService } from './setting.service';

@Role()
@Controller('setting')
export class SettingsController {
  constructor(
    @Inject(forwardRef(() => SettingService))
    private readonly settingService: SettingService,
  ) {}

  @Get('group/:slug')
  async getSettingFromGroup(
    @Pagination() paginationParams,
    @Locale() locale,
    @Param('slug') slug: string,
  ) {
    return this.settingService.getSettingFromGroup(
      locale,
      paginationParams,
      slug,
    );
  }

  @Public()
  @Get('group')
  async listSettingGroups(@Pagination() paginationParams, @Locale() locale) {
    return this.settingService.listSettingGroups(locale, paginationParams);
  }

  @Public()
  @Get('index.css')
  async handleIndexStyleFile(@Res() res) {
    const content = await this.settingService.handleIndexStyleFile();
    res.header('Content-Type', 'text/css');
    res.send(content);
  }

  @Get()
  async listSettings(@Pagination() paginationParams, @Locale() locale) {
    return this.settingService.listSettings(locale, paginationParams);
  }

  @Get(':settingId')
  async get(@Param('settingId', ParseIntPipe) settingId: number) {
    return this.settingService.get(settingId);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.settingService.create(data);
  }

  @Put('user/:slug')
  async updateUserFromSlug(
    @Param('slug') slug: string,
    @Body() { value }: SettingUserDTO,
    @User() { id },
  ) {
    return this.settingService.setSettingUserValue(id, slug, value);
  }

  @Put(':slug')
  async updateFromSlug(@Param('slug') slug: string, @Body() data: UpdateDTO) {
    return this.settingService.updateFromSlug(slug, data);
  }

  @Put()
  async setManySettings(@Body() data: SettingDTO) {
    return this.settingService.setManySettings(data);
  }

  @Patch(':settingId')
  async update(
    @Param('settingId', ParseIntPipe) settingId: number,
    @Body() data: UpdateDTO,
  ) {
    return this.settingService.update({
      id: settingId,
      data,
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.settingService.delete(data);
  }
}
