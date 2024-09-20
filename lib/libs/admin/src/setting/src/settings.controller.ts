import { AuthGuard, Permission } from '@hedhog/admin';
import { Pagination } from '@hedhog/pagination';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  forwardRef,
} from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { DeleteDTO } from './dto/delete.dto';
import { UpdateDTO } from './dto/update.dto';
import { SettingsService } from './settings.service';

@Permission()
@Controller('settings')
export class SettingsController {
  constructor(
    @Inject(forwardRef(() => SettingsService))
    private readonly settingsService: SettingsService,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  async getSettings(@Pagination() paginationParams) {
    return this.settingsService.getSettings(paginationParams);
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
