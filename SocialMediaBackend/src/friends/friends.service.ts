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

  async create(userid, friendid) {
    const user = await this.userModel.findById({ _id: userid });
    if (user.friends.includes(friendid)) {
      return 'Friend is already added';
    }
    let addFreind = await this.userModel.updateOne(
      { _id: userid },
      { $push: { friends: friendid } },
    );
    return 'Friend Added';
  }

  async findAll(_id) {
    let filter = {name :"yash"}
    const userInfo = await this.userModel.aggregate([
      { $match: filter }
    ]);
    return userInfo;


    const user = (await this.userModel.findById(_id).populate('friends'))
      .friends;
    return user;
  }

  async remove(userid, friendid) {
    await this.userModel.findByIdAndUpdate(
      { _id: userid },
      { $pull: { friends: friendid } },
    );
    return `Friend Removed Successfully`;
  }
}
