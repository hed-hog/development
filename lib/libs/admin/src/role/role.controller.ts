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
import { RoleService } from './role.service';
import { UpdateIdsDTO } from '../dto/update-ids.dto';
import { Locale } from '../locale';

@Controller('roles')
export class RoleController {
  constructor(
    @Inject(forwardRef(() => RoleService))
    private readonly roleService: RoleService,
  ) {}

  @Get()
  async getRoles(@Pagination() paginationParams, @Locale() locale) {
    return this.roleService.getRoles(locale, paginationParams);
  }

  @Get(':roleId/users')
  async listUsers(
    @Pagination() paginationParams,
    @Param('roleId', ParseIntPipe) roleId: number,
  ) {
    return this.roleService.listUsers(roleId, paginationParams);
  }

  @Get(':roleId/menus')
  async listMenus(
    @Pagination() paginationParams,
    @Param('roleId', ParseIntPipe) roleId: number,
    @Locale() locale,
  ) {
    return this.roleService.listMenus(locale, roleId, paginationParams);
  }

  @Get(':roleId/routes')
  async listRoutes(
    @Pagination() paginationParams,
    @Param('roleId', ParseIntPipe) roleId: number,
  ) {
    return this.roleService.listRoutes(roleId, paginationParams);
  }

  @Get(':roleId/screens')
  async listScreens(
    @Pagination() paginationParams,
    @Param('roleId', ParseIntPipe) roleId: number,
    @Locale() locale,
  ) {
    return this.roleService.listScreens(locale, roleId, paginationParams);
  }

  @Patch(':roleId/users')
  async updateUsers(
    @Param('roleId', ParseIntPipe) roleId: number,
    @Body() data: UpdateIdsDTO,
  ) {
    return this.roleService.updateUsers(roleId, data);
  }

  @Patch(':roleId/menus')
  async updateMenus(
    @Param('roleId', ParseIntPipe) roleId: number,
    @Body() data: UpdateIdsDTO,
  ) {
    return this.roleService.updateMenus(roleId, data);
  }

  @Patch(':roleId/routes')
  async updateRoutes(
    @Param('roleId', ParseIntPipe) roleId: number,
    @Body() data: UpdateIdsDTO,
  ) {
    return this.roleService.updateRoutes(roleId, data);
  }

  @Patch(':roleId/screens')
  async updateScreens(
    @Param('roleId', ParseIntPipe) roleId: number,
    @Body() data: UpdateIdsDTO,
  ) {
    return this.roleService.updateScreens(roleId, data);
  }

  @Get(':roleId')
  async show(@Param('roleId', ParseIntPipe) roleId: number) {
    return this.roleService.get(roleId);
  }

  @Post()
  create(@Body() data: CreateDTO) {
    return this.roleService.create(data);
  }

  @Patch(':roleId')
  async update(
    @Param('roleId', ParseIntPipe) roleId: number,
    @Body() data: UpdateDTO,
  ) {
    return this.roleService.update({
      id: roleId,
      data,
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.roleService.delete(data);
  }
}
