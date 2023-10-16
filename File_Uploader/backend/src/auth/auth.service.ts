import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    if (username === undefined || password === undefined) {
      return 'Enter all Details';
    }
    const user = await this.userService.getUser({ username });
    if (!user) return null;
    const passwordValid = await bcrypt.compare(password, user.password);
    if (passwordValid === false) return null;
    if (!user) {
      throw new UnauthorizedException('Could not find User');
    }
    if (user && password) {
      return user;
    }
    return null;
  }

  async login(user) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
