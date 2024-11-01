import { Pagination, PaginationDTO } from '@hedhog/pagination';
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
} from '@nestjs/common';
import { DeleteDTO } from '../dto/delete.dto';
import { UpdateIdsDTO } from '../dto/update-ids.dto';
import { Locale } from '../locale';
import { Role } from '../role/decorators/role.decorator';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { RouteService } from './route.service';

@Role()
@Controller('route')
export class RouteController {
  constructor(
    @Inject(forwardRef(() => RouteService))
    private readonly routeService: RouteService,
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.routeService.list(paginationParams);
  }

  @Get(':routeId')
  async get(@Param('routeId', ParseIntPipe) routeId: number) {
    return this.routeService.get(routeId);
  }

  @Post()
  async create(@Body() { url, method }: CreateDTO) {
    return this.routeService.create({ url, method });
  }

  @Patch(':routeId')
  async update(
    @Param('routeId', ParseIntPipe) routeId: number,
    @Body() data: UpdateDTO,
  ) {
    return this.routeService.update({ id: routeId, data });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.routeService.delete(data);
  }

  @Get(':routeId/role')
  async listRoles(
    @Param('routeId', ParseIntPipe) routeId: number,
    @Pagination() paginationParams: PaginationDTO,
    @Locale() locale,
  ) {
    return this.routeService.listRoles(locale, routeId, paginationParams);
  }

  @Patch(':routeId/role')
  async updateRoles(
    @Param('routeId', ParseIntPipe) routeId: number,
    @Body() data: UpdateIdsDTO,
  ) {
    return this.routeService.updateRoles(routeId, data);
  }

  @Get(':routeId/screens')
  async listScreens(
    @Param('routeId', ParseIntPipe) routeId: number,
    @Pagination() paginationParams: PaginationDTO,
    @Locale() locale,
  ) {
    return this.routeService.listScreens(locale, routeId, paginationParams);
  }

  @Patch(':routeId/screens')
  async updateScreens(
    @Param('routeId', ParseIntPipe) routeId: number,
    @Body() data: UpdateIdsDTO,
  ) {
    return this.routeService.updateScreens(routeId, data);
  }
}
