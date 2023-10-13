import { Injectable, Logger } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Posts } from './post.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/Schema/user.schema';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Posts.name) private postModel: Model<Posts>,
    @InjectModel(User.name) private userModel: Model<User>,
    private schedulerRegistry: SchedulerRegistry,
  ) {}
  private readonly logger = new Logger(PostsService.name);

  // For Creating Post.
  async createPost(
    createPostDto: CreatePostDto,
    email,
    image: Express.Multer.File,
  ) {
    // Creating an Date Object.
    const date = new Date(createPostDto.scheduleDateAndTime).getTime();
    createPostDto.scheduleDateAndTime = date;
    const post = new this.postModel({
      ...createPostDto,
      isActive: true,
      email: email,
      imagePath: image.path,
    });
    // Updating Users Collections.
    await this.userModel.updateOne(
      { email: email },
      { $push: { posts: post._id } },
      { new: true },
    );
    return post.save();
  }

  // Cron Job
  // Cron Run Every Second , 300000 : 5 minutes , 1000 : 1sec

  @Cron('45 * * * * *')
  async getPosts() {
    const date_obj = Date.now();
    const Postsdata = await this.postModel.findOne({
      scheduleDateAndTime: { $gt: date_obj - 300000, $lt: date_obj + 300000 },
      isActive: true,
    });
    if (Postsdata != null) {
      const result = await this.postModel.findOneAndUpdate(
        { email: Postsdata.email },
        { isActive: false },
        { new: true },
      );
      console.log('updated');
    }
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
}
