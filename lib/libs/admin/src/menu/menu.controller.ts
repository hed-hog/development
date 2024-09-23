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
import { AuthGuard } from '../auth/guards/auth.guard';
import { User } from '../auth/decorators/user.decorator';
import { Role } from '../role/decorators/role.decorator';

@Role()
@UseGuards(AuthGuard)
@Controller('menus')
export class MenuController {
  constructor(
    @Inject(forwardRef(() => MenuService))
    private readonly menuService: MenuService,
  ) {}

  @Get('system')
  async getSystemMenu(@User() { id }) {
    return this.menuService.getSystemMenu(id);
  }

  @Get()
  async getMenu(@Pagination() paginationParams) {
    return this.menuService.getMenu(paginationParams);
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