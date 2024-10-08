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
  forwardRef,
} from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { DeleteDTO } from './dto/delete.dto';
import { UpdateDTO } from './dto/update.dto';
import { LocaleService } from './locale.service';

@Controller('locales')
export class LocaleController {
  constructor(
    @Inject(forwardRef(() => LocaleService))
    private readonly localeService: LocaleService,
  ) {}

  @Get()
  async get(@Pagination() paginationParams) {
    return this.localeService.get(paginationParams);
  }

  @Get(':localeCode/:namespace')
  async getTranslations(
    @Param('localeCode') localeCode: string,
    @Param('namespace') namespace: string,
  ) {
    return this.localeService.getTranslations(localeCode, namespace);
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.localeService.getById(id);
  }

  @Post()
  create(@Body() data: CreateDTO) {
    return this.localeService.create(data);
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
