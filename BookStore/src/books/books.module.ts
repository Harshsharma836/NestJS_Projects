import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema, Books } from './book.schema';

@Module({
  imports : [
    MongooseModule.forFeature([
      { name : Books.name , schema : BookSchema}
     ])
  ],
  controllers: [BooksController],
  providers: [BooksService],

})
export class BooksModule {}
