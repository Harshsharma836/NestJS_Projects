import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  async sendEmail(): Promise<string> {
    // Configure nodemailer with your email service provider
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'harshsharma72001@gmail.com',
        pass: 'xppf haho tdnz kuyk ',
      },
    });

    // Define the email options
    const mailOptions = {
      from: 'harshsharma72001@gmail.com',
      to: 'harsh.sharma@cubexo.io',
      subject: 'Test Email from NestJS',
      text: 'This is a test email sent from Harsh Sharma.',
    };

    // Send the email
    try {
      await transporter.sendMail(mailOptions);
      return 'Email sent successfully!';
    } catch (error) {
      return `Error sending email: ${error.message}`;
    }
  }
}
