import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  async sendEmail(email: string, id, Otp): Promise<string> {
    // Configure nodemailer with your email service provider
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.user,
        pass: process.env.pass,
      },
    });

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
