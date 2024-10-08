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
import { DeleteDTO } from '../dto/delete.dto';
import { UpdateDTO } from './dto/update.dto';
import { ScreenService } from './screen.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Role } from '../role/decorators/role.decorator';
import { UpdateIdsDTO } from '../dto/update-ids.dto';
import { Locale } from '@hedhog/locale';

@Role()
@UseGuards(AuthGuard)
@Controller('screens')
export class ScreenController {
  constructor(
    @Inject(forwardRef(() => ScreenService))
    private readonly screenService: ScreenService,
  ) {}

  @Get()
  async getScreens(@Pagination() paginationParams, @Locale() locale) {
    return this.screenService.getScreens(locale, paginationParams);
  }

  @Get(':screenId/roles')
  async listRoles(
    @Param('screenId', ParseIntPipe) screenId: number,
    @Pagination() paginationParams,
    @Locale() locale,
  ) {
    return this.screenService.listRoles(locale, screenId, paginationParams);
  }

  @Get(':screenId/routes')
  async listRoutes(
    @Param('screenId', ParseIntPipe) screenId: number,
    @Pagination() paginationParams,
    @Locale() locale,
  ) {
    return this.screenService.listRoutes(locale, screenId, paginationParams);
  }

  @Patch(':screenId/roles')
  async updateRoles(
    @Param('screenId', ParseIntPipe) screenId: number,
    @Body() data: UpdateIdsDTO,
  ) {
    return this.screenService.updateRoles(screenId, data);
  }

  @Patch(':screenId/routes')
  async updateRoutes(
    @Param('screenId', ParseIntPipe) screenId: number,
    @Body() data: UpdateIdsDTO,
  ) {
    return this.screenService.updateRoutes(screenId, data);
  }

  @Get(':screenId')
  async show(@Param('screenId', ParseIntPipe) screenId: number) {
    return this.screenService.get(screenId);
  }

  @Post()
  create(@Body() data: CreateDTO) {
    return this.screenService.create(data);
  }

  @Patch(':screenId')
  async update(
    @Param('screenId', ParseIntPipe) screenId: number,
    @Body() data: UpdateDTO,
  ) {
    return this.screenService.update({
      id: screenId,
      data,
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.screenService.delete(data);
  }
}
