import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [BooksModule , 
    MongooseModule.forRoot('mongodb+srv://harsh:1234@netflix.ganq2b0.mongodb.net/?retryWrites=true&w=majority')],
  controllers: [],
  providers: [],

})
export class AppModule {}
