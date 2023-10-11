import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Posts } from './post.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { customException } from './exceptions/customexception';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Posts.name) private postModel: Model<Posts>) {}
  // POST

  async create(createPostDto: CreatePostDto, email) {
    createPostDto['email'] = email;
    if(!createPostDto.title || !createPostDto.description ){
      return "Give All Fields";
    }
    const createdPost = await new this.postModel(createPostDto);
    return createdPost.save();
  }

  // For Comments 

  async addComment(email, id , createCommentDto : CreateCommentDto){
    createCommentDto['email'] = email;
      await this.postModel.findByIdAndUpdate(id, {
        $push: {comments: createCommentDto},
      });
      return 'Comment Added to the Post';
  }

  async deleteComment(email, id){
    return id;
  }

  async getCommentOnPost(_id){
    const PostData = await this.postModel.findById({_id});
    return PostData.comments;
  }

  // GET :
  // This is to fetch All Posts
  async findAllOrByName(q) {
    const PostsData = await this.postModel.find({});
    if (q === undefined) {
      return PostsData;
    } else {
      const dataBasedOnQuery = PostsData.filter((item) => item.title === q);
      return dataBasedOnQuery;
    }
  }

  // This is to fetch only Particular Users Posts
  async findUserPosts(email) {
    const PostsData = await this.postModel.find({ email: email });
    return PostsData;
  }

  // This is to fetch like on Particular Post
  async findLikeOnPost(id) {
    const postData = await this.postModel.findById(id);
    console.log(postData)
    const likes = postData.likes.length;
    return `Total Likes on this post is : ${likes}`;
  }

  async findOne(email, id: number) {
    const PostsByID = await this.postModel.findById(id);
    return PostsByID;
  }

  // PATCH :

  // Only update post , where user has right as its her posts
  async update(_id: number, updatePostDto: UpdatePostDto, loginuserEmail) {
    const Post = await this.postModel.findById({ _id });
    const postEmail = Post.email;
    if (postEmail === loginuserEmail) {
      const existingPost = await this.postModel.findByIdAndUpdate(
        _id,
        updatePostDto,
        { new: true },
      );
      return existingPost;
    } else {
      throw new customException(
        'You Can`t Update this Post, This Post doesnot belongs to you ',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  // We are storing the user email in the likes array .
  async addOrRemoveLike(id: number, email) {
    const existingPost = await this.postModel.findById(id);
    const arr = existingPost.likes;
    // Check weather the user email has already
    if (arr.includes(email)) {
      await this.postModel.findByIdAndUpdate(id, {
        $pull: { likes: email },
      });
    } else {
      await this.postModel.findByIdAndUpdate(id, {
        $push: { likes: email },
      });
    }
    return 'Like Added to Post';
  }
  //
  async remove(id: number) {
    await this.postModel.findByIdAndDelete(id);
    return `The Post by #${id} is Removed`;
  }
}
