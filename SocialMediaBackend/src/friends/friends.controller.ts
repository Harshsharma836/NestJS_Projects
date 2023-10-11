import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FriendsService } from './friends.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('friend')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Post('/new')
  @UseGuards(AuthGuard)
  create(@Req() req, @Body() payload: { friendid: number }) {
    const userid = req.user.userid;
    return this.friendsService.create(userid, payload.friendid);
  }

  @Get('all')
  @UseGuards(AuthGuard)
  getAll(@Req() req) {
    const userid = req.user.userid;
    return this.friendsService.findAll(userid);
  }

  @Delete(':friendId')
  @UseGuards(AuthGuard)
  remove(@Param('friendId') friendId: number, @Req() req) {
    const userid = req.user.userid;
    return this.friendsService.remove(userid, friendId);
  }
}
