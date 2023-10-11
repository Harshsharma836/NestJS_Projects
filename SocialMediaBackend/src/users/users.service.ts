import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PostsService } from 'src/posts/posts.service';
import { User } from 'src/auth/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Posts } from 'src/posts/post.schema';

@Injectable()
export class UsersService {
  constructor(
    private postService: PostsService,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Posts.name) private postModel: Model<Posts>,
  ) {}

  // Find All exclude the user.
  async findAll(email) {
    const data = await this.userModel.find({});
    const info = data.filter((data) => {
      if (data.email != email) {
        return data;
      }
    });
    return info;
  }

  async findProfile(email) {
    // This will Populate and give all posts by the Object Id of Posts.
    const userWithPosts = await this.userModel
      .find({ email })
      .populate('posts');
    return userWithPosts;
  }

  async update(id: number, updateUserDto: UpdateUserDto, email) {
    if (
      !updateUserDto.Address ||
      !updateUserDto.HighestEducation ||
      !updateUserDto.password
    ) {
      return 'Give All Info';
    }
    const updatedUsers = await this.userModel.updateOne(
      { email: email },
      { updateUserDto },
    );
    return updatedUsers;
  }

  // Delete the Account as Well All Posts of Particular User.
  async removeUser(email) {
    // For Deleting the Posts
    await this.postModel.deleteMany({ email: email });
    // For Deleting the User
    await this.userModel.deleteOne({ email: email });
    return 'User Is Completely Deleted';
  }
}
