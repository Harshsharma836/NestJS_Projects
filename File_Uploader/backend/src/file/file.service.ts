import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { File } from './Schema/file.schema';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class FileService {
  constructor(
    @InjectModel(File.name) private fileModel: Model<File>,
    private emailService: EmailService,
  ) {}

  async create(file, email) {
    const otpExpireTime = Date.now() + 60000;
    const Otp = Math.floor(Math.random() * 10000000) + 1;
    const createFile = new this.fileModel({
      filename: file.originalname,
      email: email,
      path: file.path,
      Otp: Otp,
      otpExpiry: otpExpireTime,
    });
    return createFile.save();
  }

  getFiles() {
    return this.fileModel.find().exec();
  }

  async getFile(id: string, email) {
    const fileData = await this.fileModel.findById(id).exec();
    // Its your file No OTP Required .
    if (fileData.email == email) {
      return fileData;
    }
    console.log('This File is Secure');
    // For Sending Email
    const msg = await this.emailService.sendEmail(email, id);
    return 'Please Enter Otp for Get Image';
  }

  async validateOtp(id: string, otp: number) {
    const file = await this.fileModel.findById(id).exec();
    if (otp == file.Otp) {
      return file;
    } else {
      return 'OTP is Invalid';
    }
  }

  deleteFile(id: string) {
    return this.fileModel.findByIdAndRemove(id).exec();
  }
}
