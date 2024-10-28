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
import { Pagination, PaginationDTO } from '@hedhog/pagination';
import { RouteService } from './route.service';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { DeleteDTO } from '../dto/delete.dto';
import { UpdateIdsDTO } from '../dto/update-ids.dto';
import { Locale } from '../locale';

@Controller('routes')
export class RouteController {
  constructor(
    @Inject(forwardRef(() => RouteService))
    private readonly routeService: RouteService,
  ) {}

  @Get()
  async getRoutes(@Pagination() paginationParams) {
    return this.routeService.getRoutes(paginationParams);
  }

  @Get(':routeId')
  async getRouteById(@Param('routeId', ParseIntPipe) routeId: number) {
    return this.routeService.getRouteById(routeId);
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

  @Get(':routeId/roles')
  async listRoles(
    @Param('routeId', ParseIntPipe) routeId: number,
    @Pagination() paginationParams: PaginationDTO,
    @Locale() locale,
  ) {
    return this.routeService.listRoles(locale, routeId, paginationParams);
  }

  @Patch(':routeId/roles')
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
