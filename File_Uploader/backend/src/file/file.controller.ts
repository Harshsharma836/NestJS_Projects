import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Req,
  ParseFilePipe,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image' })],
      }),
    )
    file,
    @Req() req,
  ) {
    return this.fileService.create(file, req.user.username);
  }

  @UseGuards(JwtAuthGuard)
  @Get('files')
  getFiles() {
    return this.fileService.getFiles();
  }

  @UseGuards(JwtAuthGuard)
  @Get('files/:id')
  getFile(@Param('id') id: string, @Req() req) {
    return this.fileService.getFile(id, req.user.username);
  }

  @UseGuards(JwtAuthGuard)
  @Get('validateOtp/:id')
  validateOtp(@Param('id') id: string, @Body('Otp') Otp: number) {
    return this.fileService.validateOtp(id, Otp);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('files/:id')
  deleteFile(@Param('id') id: string) {
    return this.fileService.deleteFile(id);
  }
}
