import {
  Controller,
  Post,
  Delete,
  UploadedFile,
  Body,
  Param,
  Put,
  Get,
  UseInterceptors,
  ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { DeleteDTO } from './dto/delete.dto';
import { Pagination } from '@hedhog/pagination';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.fileService.getFiles(paginationParams);
  }

  @Get(':id')
  async show(@Param('id', ParseIntPipe) id) {
    return this.fileService.get(id);
  }

  @Get('download/:token')
  async download(@Param('token') token) {
    return this.fileService.download(token);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.upload('images', file);
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.fileService.delete(data);
  }
}
