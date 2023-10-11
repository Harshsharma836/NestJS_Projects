import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { FriendsService } from './friends.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('friend')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Post('/new')
  @UseGuards(AuthGuard)
  create(@Req() req, @Body() payload: { friendid: number }) {
    const email = req.user.sub;
    return this.friendsService.create(email, payload.friendid);
  }

  @Get('all')
  @UseGuards(AuthGuard)
  getAll(@Req() req) {
    const email = req.user.sub;
    return this.friendsService.findAll(email);
  }

  @Patch(':FriendId/closefriend')
  @UseGuards(AuthGuard)
  makeCloseFriend(@Param('FriendId') friendId: number, @Req() req) {
    const userid = req.user.userid;
    return this.friendsService.makeCloseFriend(userid, friendId);
  }

  @Delete(':friendId')
  @UseGuards(AuthGuard)
  remove(@Param('friendId') friendId: number, @Req() req) {
    const email = req.user.sub;
    return this.friendsService.remove(friendId, email);
  }
}
