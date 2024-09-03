import { AuthGuard } from '@hedhog/auth/auth.guard';
import { Pagination } from '@hedhog/pagination';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { DeleteDTO } from './dto/delete.dto';
import { UpdateDTO } from './dto/update.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getUsers(@Pagination() paginationParams) {
    return this.userService.getUsers(paginationParams);
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
