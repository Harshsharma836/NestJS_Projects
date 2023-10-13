import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import * as nodemailer from 'nodemailer'

import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ForgotPassword } from './forgot.password.schema';
import { ForgotPasswordDto } from './dto/forgot_password.dto';
import { VerifyOtpDTO } from './dto/verify_otp.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    @InjectModel(ForgotPassword.name) private forgotPasswordModel : Model<ForgotPassword>
  ) {}

  async signIn(email, pass) {
    const user = await this.userModel.findOne({ email });
    if (!user || user.password !== pass) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = {
      userid: user._id,
      sub: user.email,
      password: user.password,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  // Register User With Validation.
  async registerIn(userData) {
    const existingUser = await this.userModel.find({ email: userData.email });
    if (existingUser.length != 0) {
      return 'User Already Exist, Try Login';
    }
    userData.isActive = true;
    const user = new this.userModel(userData);
    user.save();
    return 'User Is Created , Please Login';
  }

  // Forgot Password via Email

  async sendEmailForgotPassword(email: string) {
    let user = await this.userModel.findOne({email : email});
    if(!user){
      throw new HttpException("LOGIN.USER_NOT_FOUND" , HttpStatus.NOT_FOUND);
    }
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'harshsharma72001@gmail.com',
          pass: 'xppf haho tdnz kuyk ',
        },
    });

    let time = Date.now();
    let otpExpireTime = Date.now()+300000 ; // for minutes extra
    // 8 digit Otp
    let otp = Math.floor(Math.random() * 10000000) + 1;
      // Define the email options
  
      const mailOptions = {
      from: 'harshsharma72001@gmail.com',
      to: email,
      subject: 'Forgot Password',
      text : `OTP is ${otp} , It is valid for only 5 Min` ,
    };
    let data = {otp : otp , email : email , otpExpireTime : otpExpireTime};
    await this.forgotPasswordModel.create(data);

      // Send the email
    try {
      await transporter.sendMail(mailOptions);
      return 'Email sent successfully!';
    } catch (error) {
      return `Error sending email: ${error.message}`;
    }
  }

  async verifyOtp( verifyOtpDTO : VerifyOtpDTO  ){
      let date = Date.now();
      if( !verifyOtpDTO.email || !verifyOtpDTO.otp || !verifyOtpDTO.email){
        return "Enter OTP";
      }
      // Sorting the data based on CreatedAt.
      let forgotPassword = await this.forgotPasswordModel.findOne({ email: verifyOtpDTO.email })
      .sort({ createdAt: -1 });

      if(forgotPassword.otp != verifyOtpDTO.otp){
          return "OTP is Not Valid";
      }
      if(date > forgotPassword.otpExpireTime) return "OTP is Expired";
      
      // All things are valid now so update the password

      const updateUser = await this.userModel.updateOne(
        { email: verifyOtpDTO.email },
        { $set: { password: verifyOtpDTO.password}}
      );
      return "Password Updated Successfully";
      
      // let data = await this.forgotPasswordModel.findOne({email:forgotPasswordDto.gmail})
  }
}
