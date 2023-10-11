import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { FriendsModule } from './friends/friends.module';
import { friendsMiddleware } from './friends/friends.middleware';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PostsModule,
    MongooseModule.forRoot(
      'mongodb+srv://harsh:1234@netflix.ganq2b0.mongodb.net/?retryWrites=true&w=majority',
    ),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    FriendsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(friendsMiddleware).forRoutes('friend');
  }
}
