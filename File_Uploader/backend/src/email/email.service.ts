import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as nodemailer from 'nodemailer';
import { File } from 'src/file/Schema/file.schema';

@Injectable()
export class EmailService {
  constructor(@InjectModel(File.name) private fileModel: Model<File>) {}

  async sendEmail(email: string, id): Promise<string> {
    // Configure nodemailer with your email service provider
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.user,
        pass: process.env.pass,
      },
    });

    const otpExpireTime = Date.now();

    const fileData = await this.fileModel.findById(id);
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

    // Define the email options
    const mailOptions = {
      from: 'harshsharma72001@gmail.com',
      to: email,
      subject: 'Test Email from NestJS',
      text: `OTP is ${Otp} , It is valid for only 5 Min`,
    };

    try {
      await transporter.sendMail(mailOptions);
      return 'Email Otp sent successfully!';
    } catch (error) {
      return `Error sending email: ${error.message}`;
    }
  }
}
