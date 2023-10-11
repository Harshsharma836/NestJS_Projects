import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Posts, PostSchema } from './post.schema';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: Posts.name, schema: PostSchema }]),
    MulterModule.register({
      dest: './uploads', // Sett destination for uploaded file
    }),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
