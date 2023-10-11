import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PostsService } from 'src/posts/posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema, Posts } from 'src/posts/post.schema';
import { User, UserSchema } from 'src/auth/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Posts.name, schema: PostSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, PostsService],
})
export class UsersModule {}
