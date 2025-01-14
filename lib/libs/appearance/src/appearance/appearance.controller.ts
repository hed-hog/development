import { Pagination } from '@hedhog/pagination';
import { Locale } from '@hedhog/locale';
import {
  Body,
  Controller,
  Get,
  Inject,
  Put,
  Res,
  forwardRef,
} from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { AppearanceService } from './appearance.service';
import { Role, Public } from '@hedhog/core';

@Role()
@Controller('appearance')
export class AppearanceController {
  constructor(
    @Inject(forwardRef(() => AppearanceService))
    private readonly appearanceService: AppearanceService,
  ) {}
  @Get()
  async getAppearance(@Pagination() paginationParams, @Locale() locale) {
    return this.appearanceService.getAppearance(locale, paginationParams);
  }

  @Public()
  @Get('index.css')
  async handleIndexStyleFile(@Res() res) {
    const content = await this.appearanceService.handleIndexStyleFile();
    res.header('Content-Type', 'text/css');
    res.send(content);
  }

  @Put()
  async setAppearance(@Body() data: CreateDTO) {
    return this.appearanceService.setAppearance(data);
  }
}
