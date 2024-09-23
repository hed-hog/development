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
import { RoleService } from './role.service';
import { Role } from './decorators/role.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';

@Role()
@UseGuards(AuthGuard)
@Controller('roles')
export class RoleController {
  constructor(
    @Inject(forwardRef(() => RoleService))
    private readonly roleService: RoleService,
  ) {}

  @Get()
  async getRoles(@Pagination() paginationParams) {
    return this.roleService.getRoles(paginationParams);
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
