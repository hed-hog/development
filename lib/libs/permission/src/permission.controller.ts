import { AuthGuard } from '@hedhog/auth';
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
import { PermissionService } from './permission.service';
import { Permission } from './decorators/permission.decorator';

@Permission()
@Controller('permissions')
export class PermissionController {
  constructor(
    @Inject(forwardRef(() => PermissionService))
    private readonly permissionService: PermissionService,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  async getPermissions(@Pagination() paginationParams) {
    return this.permissionService.getPermissions(paginationParams);
  }

  @UseGuards(AuthGuard)
  @Get(':permissionId')
  async show(@Param('PermissionId', ParseIntPipe) permissionId: number) {
    return this.permissionService.get(permissionId);
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() data: CreateDTO) {
    return this.permissionService.create(data);
  }

  @UseGuards(AuthGuard)
  @Patch(':permissionId')
  async update(
    @Param('PermissionId', ParseIntPipe) permissionId: number,
    @Body() data: UpdateDTO,
  ) {
    return this.permissionService.update({
      id: permissionId,
      data,
    });
  }

  @UseGuards(AuthGuard)
  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.permissionService.delete(data);
  }
}
