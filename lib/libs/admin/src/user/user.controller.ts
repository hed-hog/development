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
import { DeleteDTO } from '../dto/delete.dto';
import { UpdateIdsDTO } from '../dto/update-ids.dto';
import { Role } from '../role/decorators/role.decorator';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { UserService } from './user.service';

@Role()
@Controller('users')
export class UserController {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  @Get()
  async getUsers(@Pagination() paginationParams) {
    return this.userService.getUsers(paginationParams);
  }

  @Get(':userId/roles')
  async listRoles(
    @Param('userId', ParseIntPipe) userId: number,
    @Pagination() paginationParams,
  ) {
    return this.userService.listRoles(userId, paginationParams);
  }

  @Patch(':userId/roles')
  async updateRoles(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() data: UpdateIdsDTO,
  ) {
    return this.userService.updateRoles(userId, data);
  }

  @Get(':userId')
  async show(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.get(userId);
  }

  @Post()
  create(@Body() data: CreateDTO) {
    return this.userService.create(data);
  }

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

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.userService.delete(data);
  }
}
