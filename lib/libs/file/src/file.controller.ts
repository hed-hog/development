import { Role } from '@hedhog/core';
import { Pagination } from '@hedhog/pagination';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  forwardRef,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DeleteDTO } from './dto/delete.dto';
import { FileService } from './file.service';
import { UploadFileDTO } from './dto/upload.dto';

@Role()
@Controller('file')
export class FileController {
  constructor(
    @Inject(forwardRef(() => FileService))
    private readonly fileService: FileService,
  ) {}

  @Get()
  async list(@Pagination() paginationParams) {
    return this.fileService.getFiles(paginationParams);
  }

  @Get(':id')
  async show(@Param('id', ParseIntPipe) id) {
    return this.fileService.get(id);
  }

  @Put('download/:id')
  async getTempURL(@Param('id', ParseIntPipe) id) {
    return {
      url: await this.fileService.tempURL(
        (await this.fileService.get(id)).path,
      ),
    };
  }

  @Get('download/:token')
  async download(@Param('token') token) {
    return this.fileService.download(token);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UploadFileDTO,
  ) {
    const destination = body.destination || 'files';
    return this.fileService.upload(destination, file);
  }

  @Delete()
  async delete(@Body() data: DeleteDTO) {
    return this.fileService.delete(data);
  }
}
