import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
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
      return 'Email Already Exist , Try Login';
    }
    userData.isActive = true;
    const user = new this.userModel(userData);
    user.save();
    return 'User Is Created , Please Login';
  }
}
