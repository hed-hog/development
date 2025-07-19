import { Public, Role } from '@hedhog/core';
import { Pagination } from '@hedhog/pagination';
import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DeleteDTO } from './dto/delete.dto';
import { UploadFileDTO } from './dto/upload.dto';
import { FileService } from './file.service';

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

  @Public()
  @Get('open/:fileId')
  async getLocalFile(
    @Param('fileId', ParseIntPipe) fileId: number,
    @Res() res,
  ) {
    const { buffer, file } = await this.fileService.getBuffer(fileId);
    res.set({
      'Content-Type': file.file_mimetype,
      'Content-Length': buffer.length,
    });
    res.send(buffer);
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
