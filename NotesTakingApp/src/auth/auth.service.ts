// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { RegisterUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Role } from './dto/role.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({ email });
    // console.log(user.hasOwnProperty('password'))
    console.log(user.role);
    // console.log(Object.keys(user));
    if (!user || user.password !== pass) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.email, role: user.role as Role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async registerIn(registerUserDto: RegisterUserDto) {
    const createUser = new this.userModel(registerUserDto);
    createUser.save();
    return 'User Created Please Login';
  }
}
