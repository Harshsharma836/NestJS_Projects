import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/signup')
  async createUser(
    @Body('fullName') fullName: string,
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    if (fullName === undefined || username === undefined || password === undefined) {
      return 'Please Enter Username and Password';
    }
    const salt = 10;
    const user = await this.userService.getUser({ username });
    if (user) return 'User Already Exists';
    const hashedPassword = await bcrypt.hash(password, salt);
    const result = await this.userService.createUser(fullName , username, hashedPassword );
    return result;
  }
}
