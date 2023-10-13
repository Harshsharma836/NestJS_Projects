import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './book.schema';
import { User, UserSchema } from 'src/auth/Schema/user.schema';
import { TransactionService } from './transcation.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Book.name, schema: BookSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [BooksController],
  providers: [BooksService, TransactionService],
})
export class BooksModule {}
