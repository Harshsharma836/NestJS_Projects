import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
  HttpCode,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from 'src/auth/auth.guard'; // Using AutGuard of auth
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // Here we are using Req@ Decorator to get the User Info like email from the authguard

  @HttpCode(201)
  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: '/home/my/Desktop/BlogApi/src/posts/ImagesPosts',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  createPost(@Body() createPostDto: CreatePostDto, @Req() req) {
    return this.postsService.create(createPostDto, req.user.sub);
  }

  // Post Comments on post by Id
  @UseGuards(AuthGuard)
  @Post('/:postId/addComment')
  addComment(@Param('postId')postId:number  , @Body() createCommentDto : CreateCommentDto , @Req() req){
    return this.postsService.addComment(req.user.sub , postId ,createCommentDto);
  }

  // Get Comment on Post by Id
  @UseGuards(AuthGuard)
  @Get('/:postId/comments')
  getCommentOnPost(@Param('postId') postId:number){
    return this.postsService.getCommentOnPost(postId);
  }

  // Delete Comment on Post by Id
  @UseGuards(AuthGuard)
  @Patch('/:postId/deleteComment')
  deleteComment(@Param('postId') postId:number , @Req()req){
    return this.postsService.deleteComment(req.user.sub , postId);
  }


  // Find all or by query name
  @UseGuards(AuthGuard)
  @Get()
  findAll(@Query('q') q) {
    return this.postsService.findAllOrByName(q);
  }

  @UseGuards(AuthGuard)
  @Get('user')
  findUserPosts(@Req() req) {
    return this.postsService.findUserPosts(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get('/:id/likeonpost')
  findLikeOnPost(@Param('id') id: number) {
    return this.postsService.findLikeOnPost(id);
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  findOne(@Param('id') id: number, @Req() req) {
    return this.postsService.findOne(req.user.sub, id);
  }

  // For Updating the User Personal Post.
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updatePostDto: UpdatePostDto,
    @Req() req,
  ) {
    return this.postsService.update(id, updatePostDto, req.user.sub);
  }

  // For Adding and Removing Likes.
  @UseGuards(AuthGuard)
  @Patch('/:id/like')
  addOrRemoveLike(@Param('id') id: number, @Req() req) {
    return this.postsService.addOrRemoveLike(id, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.postsService.remove(id);
  }
}
