import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Find All
  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Req() req) {
    const email = req.user.sub;
    const data = await this.usersService.findAll(email);
    return data;
  }

  @Get('/profile')
  @UseGuards(AuthGuard)
  async findProfile(@Req() req) {
    const email = req.user.sub;
    const data = await this.usersService.findProfile(email);
    return data;
  }

  @Patch('/profile')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req,
  ) {
    return this.usersService.update(id, updateUserDto, req.user.sub);
  }

  @Delete('/profile')
  @UseGuards(AuthGuard)
  removeUser(@Req() req) {
    return this.usersService.removeUser(req.user.sub);
  }
}
