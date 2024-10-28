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
import { User } from '../auth/decorators/user.decorator';
import { DeleteDTO } from '../dto/delete.dto';
import { UpdateIdsDTO } from '../dto/update-ids.dto';
import { Locale } from '../locale';
import { CreateDTO } from './dto/create.dto';
import { OrderDTO } from './dto/order.dto';
import { UpdateDTO } from './dto/update.dto';
import { MenuService } from './menu.service';

@Controller('menus')
export class MenuController {
  constructor(
    @Inject(forwardRef(() => MenuService))
    private readonly menuService: MenuService,
  ) {}

  @Get('system')
  async getSystemMenu(@User() { id }, @Locale() locale) {
    return this.menuService.getSystemMenu(locale, id);
  }

  @Get()
  async getMenu(@Pagination() paginationParams, @Locale() locale) {
    return this.menuService.getMenu(locale, paginationParams);
  }

  @Get(':menuId/roles')
  async listRoles(
    @Param('menuId', ParseIntPipe) menuId: number,
    @Pagination() paginationParams,
    @Locale() locale,
  ) {
    return this.menuService.listRoles(locale, menuId, paginationParams);
  }

  @Get(':menuId/screens')
  async listScreens(
    @Param('menuId', ParseIntPipe) menuId: number,
    @Pagination() paginationParams,
    @Locale() locale,
  ) {
    return this.menuService.listScreens(locale, menuId, paginationParams);
  }

  @Patch(':menuId/roles')
  async updateRoles(
    @Param('menuId', ParseIntPipe) menuId: number,
    @Body() data: UpdateIdsDTO,
  ) {
    return this.menuService.updateRoles(menuId, data);
  }

  @Patch(':menuId/screens')
  async updateScreens(
    @Param('menuId', ParseIntPipe) menuId: number,
    @Body() data: UpdateIdsDTO,
  ) {
    return this.menuService.updateScreens(menuId, data);
  }

  @Get(':menuId')
  async show(@Param('menuId', ParseIntPipe) menuId: number) {
    return this.menuService.get(menuId);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.menuService.create(data);
  }

  @Patch(':menuId')
  async update(
    @Param('menuId', ParseIntPipe) menuId: number,
    @Body() data: UpdateDTO,
  ) {
    return this.menuService.update({
      id: menuId,
      data,
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.menuService.delete(data);
  }

  @Patch('order')
  async updateOrder(@Body() data: OrderDTO): Promise<void> {
    return this.menuService.updateOrder(data);
  }
}
