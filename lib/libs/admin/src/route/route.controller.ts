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
  UseGuards,
} from '@nestjs/common';
import { Role } from '../role/decorators/role.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Pagination } from '@hedhog/pagination';
import { RouteService } from './route.service';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { DeleteDTO } from './dto/delete.dto';

@Role()
@UseGuards(AuthGuard)
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
}
