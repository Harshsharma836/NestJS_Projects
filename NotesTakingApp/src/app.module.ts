import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { NotesModule } from './notes/notes.module';
@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://harsh:1234@netflix.ganq2b0.mongodb.net/?retryWrites=true&w=majority',
    ),
    ConfigModule.forRoot(),
    NotesModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
