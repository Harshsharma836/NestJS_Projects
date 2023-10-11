import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './book.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/user.schema';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private bookModel = Model<Book>,
    @InjectModel(User.name) private userModel = Model<User>,
  ) {}

  async create(createBookDto: CreateBookDto, userid) {
    createBookDto['userid'] = userid;
    const book = await this.bookModel.create(createBookDto);
    const result = await this.userModel.findByIdAndUpdate(
      { _id: userid },
      { $push: { books: book._id } },
    );
    const ans = await this.userModel
      .findById({ _id: userid })
      .populate('books');
    return ans;
  }

  findAll() {
    return `This action returns all books`;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
