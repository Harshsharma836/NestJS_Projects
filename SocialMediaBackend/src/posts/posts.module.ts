import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema, Posts } from './post.schema';
import { MulterModule } from '@nestjs/platform-express';
import { User, UserSchema } from 'src/auth/user.schema';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Posts.name, schema: PostSchema },
      { name: User.name, schema: UserSchema },
    ]),
    MulterModule.register({
      dest: './uploads', // Sett destination for uploaded file
    }),
  ],
  controllers: [PostsController],
  providers: [PostsService, UsersService],
})
export class PostsModule {}
