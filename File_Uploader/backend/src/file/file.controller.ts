import { Controller, Get, Post, Body, Patch, Param, Delete , UploadedFile , UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file) {
    return this.fileService.create(file);
  }

  @Get('files')
  getFiles() {
    return this.fileService.getFiles();
  }

  @Get('files/:id')
  getFile(@Param('id') id: string) {
    return this.fileService.getFile(id);
  }

  @Delete('files/:id')
  deleteFile(@Param('id') id: string) {
    return this.fileService.deleteFile(id);
  }
}
