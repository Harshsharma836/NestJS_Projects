import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { File, FileSchema } from './Schema/file.schema';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports : [ MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),

  MulterModule.register({
    dest: './uploads', // Define the upload directory
  }),

],
  controllers: [FileController],
  providers: [FileService ],
})
export class FileModule {}
