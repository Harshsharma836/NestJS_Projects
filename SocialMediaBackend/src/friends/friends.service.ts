// Friends Services are Not Completed its on Working .

import { Injectable } from '@nestjs/common';
import { Friends } from './friends.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/user.schema';

@Injectable()
export class FriendsService {
  constructor(
    @InjectModel(Friends.name) private friendModel: Model<Friends>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(email, friendid) {
    const user = await this.userModel.find({ email: email });
    const friend = await this.userModel.findById(friendid);
    const frientData = await this.friendModel.find({ friendId: friendid });

    if (frientData.length !== 0) {
      return 'Friend Already Exists';
    }
    const friendData = await this.friendModel.create({
      friendId: friendid,
      userId: user[0]._id,
      friendName: friend.name,
      isClosedFriend: false,
    });
    friendid = friendData._id;
    user[0].friends.push(friendid);
    await friendData.save();
    console.log(friend);
    friend.friends.push(user[0].id);
    await user[0].save();
    await friend.save();
    return {
      message: `${friend.name} has been added to your friend`,
    };
  }

  async findAll(email) {
    const user = await this.userModel.find({ email });
    const data = (await this.userModel.findById(user[0].id).populate('friends'))
      .friends;
    return data;
  }

  async makeCloseFriend(userId, friendId) {
    const data = await this.friendModel
      .findOne({
        userId,
        friendId,
      })
      .exec();
    if (data.isClosedFriend == true) data.isClosedFriend = false;
    else data.isClosedFriend = true;
    await data.save();
    return 'Freindship updated';
  }

  async remove(friendId: number, email: string) {
    await this.userModel.updateOne({ email }, { $pull: { friends: friendId } });
    return `Friend Removed Successfully`;
  }
}
