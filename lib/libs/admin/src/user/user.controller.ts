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
import { UserService } from './user.service';
import { Permission } from '../permission/decorators/permission.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UpdateRolesDTO } from './dto/update-roles.dto';

@Permission()
@Controller('users')
export class UserController {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  async getUsers(@Pagination() paginationParams) {
    return this.userService.getUsers(paginationParams);
  }

  @UseGuards(AuthGuard)
  @Get(':userId/roles')
  async listRoles(
    @Param('userId', ParseIntPipe) userId: number,
    @Pagination() paginationParams,
  ) {
    return this.userService.listRoles(userId, paginationParams);
  }

  @UseGuards(AuthGuard)
  @Patch(':userId/roles')
  async updateRoles(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() data: UpdateRolesDTO,
  ) {
    return this.userService.updateRoles(userId, data);
  }

  @UseGuards(AuthGuard)
  @Get(':userId')
  async show(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.get(userId);
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() data: CreateDTO) {
    return this.userService.create(data);
  }

  @UseGuards(AuthGuard)
  @Patch(':userId')
  async update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() data: UpdateDTO,
  ) {
    return this.userService.update({
      id: userId,
      data,
    });
  }

  @UseGuards(AuthGuard)
  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.userService.delete(data);
  }
}
