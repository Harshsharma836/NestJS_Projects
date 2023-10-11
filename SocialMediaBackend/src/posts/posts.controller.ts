import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // For Upload the Post Data.
  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async createPost(
    @UploadedFile() image: Express.Multer.File,
    @Body() createPostDto: CreatePostDto,
    @Req() req,
  ) {
    const createdPost = await this.postsService.createPost(
      createPostDto,
      req.user.sub,
      image,
    );

    return createdPost;
  }

  //-------------------------------------------------------------------|

  // LIKES Functionalities :

  // For Post Like , Open for EveryUser.
  @Post(':id/like')
  @UseGuards(AuthGuard)
  async getAndRemoveLikes(@Param('id') id: number, @Req() req) {
    const email = req.user.sub;
    const updatedPost = await this.postsService.getAndRemoveLikes(id, email);
    return updatedPost;
  }

  // Get Like on Post , Open for EveryUser
  @Get(':id/like')
  @UseGuards(AuthGuard)
  async getLikeOnPost(@Param('id') id: number) {
    return await this.postsService.getLikeOnPost(id);
  }

  //-------------------------------------------------------------------|

  // COMMENTS Functionalities :

  @Post(':id/comment')
  @UseGuards(AuthGuard)
  async addComments(
    @Param('id') id: number,
    @Body('comment') comment,
    @Req() req,
  ) {
    return await this.postsService.addComments(id, comment, req.user.sub);
  }

  @Get(':id/comment')
  @UseGuards(AuthGuard)
  async getComments(@Param('id') id: number) {
    console.log(id);
    return await this.postsService.getComment(id);
  }

  //-------------------------------------------------------------------|

  // Get Users Post
  @Get('/profile')
  @UseGuards(AuthGuard)
  findUsersPosts(@Req() req) {
    return this.postsService.findUsersPosts(req.user.sub);
  }

  // Get All Posts
  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.postsService.findAll();
  }

  // Get Posts by Id
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.postsService.findOne(id);
  }

  // Updating User Personal Post.
  @Patch(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: number,
    @UploadedFile() image: Express.Multer.File,
    @Body() updatePostDto: UpdatePostDto,
    @Req() req,
  ) {
    return this.postsService.update(id, image, updatePostDto, req.user.sub);
  }

  // Deleting User Personal Post.
  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: number, @Req() req) {
    return this.postsService.remove(id, req.user.sub);
  }
}
