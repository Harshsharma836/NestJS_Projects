import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { FriendsModule } from './friends/friends.module';
import { friendsMiddleware } from './friends/friends.middleware';
import { BooksModule } from './books/books.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    EmailModule,
    AuthModule,
    UsersModule,
    PostsModule,
    BooksModule,
    MongooseModule.forRoot(
      'mongodb+srv://harsh:1234@netflix.ganq2b0.mongodb.net/?retryWrites=true&w=majority',
    ),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    FriendsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(friendsMiddleware).forRoutes('friend');
  }
}
