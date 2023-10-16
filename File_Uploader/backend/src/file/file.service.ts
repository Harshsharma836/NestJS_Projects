import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { File } from './Schema/file.schema';

@Injectable()
export class FileService {

  constructor(@InjectModel(File.name) private fileModel :  Model<File> ){}

  async create(file) {
    console.log(file)
    const createFile =  new this.fileModel({
      filename: file.originalname,
      path : file.path
    })
    return createFile.save();
  }

  getFiles() {
    return this.fileModel.find().exec();
  }

  getFile(id: string) {
    return this.fileModel.findById(id).exec();
  }

  deleteFile(id: string) {
    return this.fileModel.findByIdAndRemove(id).exec();
  }
}
