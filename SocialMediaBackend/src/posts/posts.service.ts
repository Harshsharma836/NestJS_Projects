import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Posts } from './post.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/user.schema';
import { SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Posts.name) private postModel: Model<Posts>,
    @InjectModel(User.name) private userModel: Model<User>,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  // For Creating Post .
  async createPost(
    createPostDto: CreatePostDto,
    email,
    image: Express.Multer.File,
  ) {
    const post = new this.postModel({
      ...createPostDto,
      email: email,
      imagePath: image.path,
    });
    // For Users Table
    await this.userModel.updateOne(
      { email: email },
      { $push: { posts: post._id } },
      { new: true },
    );
    return post.save();
  }

  // Likes Service :-

  async getAndRemoveLikes(id, email) {
    const Posts = await this.postModel.findById(id);
    let likes = Posts.likes;
    if (likes.includes(email)) {
      likes = likes.filter((like) => like !== email);
    } else {
      likes.push(email);
    }
    Posts.likes = likes;
    await Posts.save();
    return Posts;
  }

  async getLikeOnPost(id: number) {
    const Posts = await this.postModel.findById(id);
    return Posts.likes.length;
  }

  // Posts Service :-

  async findAll() {
    const Posts = await this.postModel.find();
    return Posts;
  }

  async findUsersPosts(email: string) {
    const Posts = await this.postModel.find({ email });
    if (Posts.length > 0) {
      return Posts;
    } else {
      return 'No Post Available';
    }
  }

  // This is Open for All Users

  findOne(id: number) {
    const data = this.postModel.findById(id).exec();
    return data;
  }

  // Update the Users Post
  async update(id: number, image, updatePostDto: UpdatePostDto, email: string) {
    if (!updatePostDto.caption && !updatePostDto.title) {
      return 'Please Entry all Specified Fields';
    }
    const postData = await this.postModel.findById(id);
    if (postData == null) return 'No Post avalable for the given Id';
    if (postData.email != email) {
      console.log('Unauthorized , User has no Permission ');
    }
    const result = await this.postModel.updateOne(
      { _id: id },
      { $set: updatePostDto, imagePath: image.path },
    );
    return result;
  }

  // Remove the Post and Update the User posts arrayy
  async remove(id: number, email: string) {
    const postData = await this.postModel.findById(id);
    if (postData.email != email) {
      return 'Unauthorized ,User has no Permission ';
    } else {
      await this.userModel.updateOne({ email }, { $pull: { posts: id } });
      await this.postModel.findByIdAndDelete(id);
      return 'Successfully Deleted';
    }
  }

  // Comments Service :-

  async addComments(id, comment: string, email: string) {
    if (comment === undefined) return 'Please Enter Comment First';
    const commentToSave = { By: email, Comment: comment };
    const Posts = await this.postModel.findById(id);
    const allComments = Posts.comments;
    allComments.push(commentToSave);
    Posts.comments = allComments;
    await Posts.save();
    return Posts;
  }

  async getComment(id) {
    const commentsOnPost = await this.postModel.findById(id);
    return commentsOnPost.comments;
  }

  // @Cron('20 * * * * * ')
  // async createPostAt(
  //   time,
  //   createPostDto: CreatePostDto,
  //   email,
  //   image: Express.Multer.File,
  // ) {
  //   console.log(time);
  //   return 'Wait';
  //   this.logger.debug(this.createPost(createPostDto, email, image));
  // }
}
