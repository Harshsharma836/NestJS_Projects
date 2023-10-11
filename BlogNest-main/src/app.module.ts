import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { AuthModule } from './auth/auth.module';
dotenv.config();
@Module({
  imports: [
    PostsModule,
    HttpModule,
    AuthModule,
    MongooseModule.forRoot(process.env.MONGO_URL),
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
