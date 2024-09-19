import { AuthGuard, User } from '@hedhog/auth';
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
import { MenuService } from './menu.service';
import { OrderDTO } from './dto/order.dto';

@Controller('menus')
export class MenuController {
  constructor(
    @Inject(forwardRef(() => MenuService))
    private readonly menuService: MenuService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('system')
  async getSystemMenu(@User() { id }) {
    return this.menuService.getSystemMenu(id);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getMenu(@Pagination() paginationParams) {
    return this.menuService.getMenu(paginationParams);
  }

  @UseGuards(AuthGuard)
  @Get(':menuId')
  async show(@Param('menuId', ParseIntPipe) menuId: number) {
    return this.menuService.get(menuId);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() data: CreateDTO) {
    return this.menuService.create(data);
  }

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.menuService.delete(data);
  }

  @UseGuards(AuthGuard)
  @Patch('order')
  async updateOrder(@Body() data: OrderDTO): Promise<void> {
    return this.menuService.updateOrder(data);
  }
}
