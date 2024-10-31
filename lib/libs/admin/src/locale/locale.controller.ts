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
} from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator';
import { Role } from '../role/decorators/role.decorator';
import { CreateDTO } from './dto/create.dto';
import { DeleteDTO } from './dto/delete.dto';
import { SetEnabledDTO } from './dto/set-enabled.dto';
import { UpdateDTO } from './dto/update.dto';
import { Locale } from './locale.decorator';
import { LocaleService } from './locale.service';

@Role()
@Controller('locale')
export class LocaleController {
  constructor(
    @Inject(forwardRef(() => LocaleService))
    private readonly localeService: LocaleService,
  ) {}

  @Public()
  @Get('system/enables')
  async getEnables(@Pagination() paginationParams, @Locale() locale: string) {
    return this.localeService.getEnables(locale, paginationParams);
  }

  @Public()
  @Get(':localeCode/:namespace')
  async getTranslations(
    @Param('localeCode') localeCode: string,
    @Param('namespace') namespace: string,
  ) {
    return this.localeService.getTranslations(localeCode, namespace);
  }

  @Get()
  async get(@Pagination() paginationParams, @Locale() locale: string) {
    return this.localeService.get(locale, paginationParams);
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.localeService.getById(id);
  }

  @Post()
  create(@Body() data: CreateDTO) {
    return this.localeService.create(data);
  }

  @Put()
  async setEnabled(@Body() { codes }: SetEnabledDTO) {
    return this.localeService.setEnabled(codes);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.localeService.update({
      id,
      data,
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.localeService.delete(data);
  }
}
