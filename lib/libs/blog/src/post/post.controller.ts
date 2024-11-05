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
import { CreateDTO } from './dto/create.dto';
import { DeleteDTO } from './dto/delete.dto';
import { UpdateDTO } from './dto/update.dto';
import { PostService } from './post.service';
import { Role } from '@hedhog/utils';

@Role()
@Controller('post')
export class PostController {
  constructor(
    @Inject(forwardRef(() => PostService))
    private readonly postService: PostService,
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.postService.list(paginationParams);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.postService.get(id);
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return this.postService.create(data);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.postService.update({
      id,
      data,
    });
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.postService.delete(data);
  }
}
