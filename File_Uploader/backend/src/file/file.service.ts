import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { File } from './Schema/file.schema';
import { EmailService } from 'src/email/email.service';
import { CloudinaryService } from 'src/clodinary/cloudinary.service';
import { FileUser } from 'src/users/users.model';

@Injectable()
export class FileService {
  constructor(
    @InjectModel(File.name) private fileModel: Model<File>,
    @InjectModel(FileUser.name) private userModel: Model<FileUser>,
    private emailService: EmailService,
    private cloudinary: CloudinaryService,
  ) {}

  // Uploading File In Cloudinary and Path in MongoDB Atlas

  async create(file, email, secure) {
    let fileCloudinary;
    try {
      fileCloudinary = await this.cloudinary.uploadImage(file);
    } catch (err) {
      console.log(err);
      return err;
    }
    const url = fileCloudinary.secure_url;

    const otpExpireTime = Date.now() + 300000;
    const Otp = Math.floor(Math.random() * 10000000) + 1;
    const createFile = new this.fileModel({
      filename: file.originalname,
      email: email,
      path: url,
      Otp: Otp,
      otpExpiry: otpExpireTime,
      secure: secure,
    });
    console.log(email);
    console.log(createFile._id);
    const updatedData = await this.userModel.findOneAndUpdate(
      { username: email },
      { $push: { files: createFile._id } },
      { new: true },
    );
    createFile.save();
    return "File Uploaded Successfully ";
  }

  async getUserWithFiles() {
    const ans = await this.fileModel.aggregate([
      {
        $group: {
          _id: '$email',
          uniqueImages: { $addToSet: '$path' },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          email: '$_id',
          uniqueImages: 1,
          imageCount: '$count',
        },
      },
    ]);

    ans.map((val) => {
      console.log(`User : ${val.email} has total ${val.imageCount}`);
    });
    return ans;
  }

  async getFile(id: string, email) {
    const fileData = await this.fileModel.findById(id).exec();
    if (fileData === null) {
      return 'No File Avialable by this Id';
    }
    // Its your file No OTP Required .
    if (fileData.email == email) {
      return fileData;
    }
    if (fileData.secure === false) {
      return fileData;
    }
    // For Sending Email
    console.log(`File is Secure OTP is Sending to : ${fileData.email}`);
    const otpExpireTime = Date.now();

    let Otp = fileData.Otp;
    if (otpExpireTime > fileData.otpExpiry) {
      Otp = Math.floor(Math.random() * 10000000) + 1;
      const updateExpireTime = Date.now() + 300000;
      await this.fileModel.findByIdAndUpdate(
        { _id: id },
        { $set: { Otp: Otp, otpExpiry: updateExpireTime } },
        { new: true },
      );
    }
    const msg = await this.emailService.sendEmail(fileData.email, id, Otp);
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

  async deleteFile(id: string, email) {
    await this.userModel.updateOne({ email }, { $pull: { files: id } });
    return await this.fileModel.findByIdAndRemove(id).exec();
  }
}
