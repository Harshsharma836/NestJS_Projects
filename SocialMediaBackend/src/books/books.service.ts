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
    return 'Book Added';
  }

  // Count Book
  async countUserBook(userid) {
    const counts = await this.bookModel.count({ userid });
    return counts;
  }

  // Find Books by Title and Calculate its all sum
  async TotalBooksPrice(title) {
    if (title == undefined) return 'Title is Not Provided';
    const totalPrice = await this.bookModel.aggregate([
      {
        $match: { title: title },
      },
      {
        $group: { _id: '$title', totalPrice: { $sum: '$price' } },
      },
    ]);
    return totalPrice;
  }

  // Transaction Testing :

  async transcation(userid) {
    // let sessionHistort = [];
    // let session = this.userModel.startSession(); // It store the session object
    // (await session).startTransaction({
    //   readConcern: { level: 'snapshot' },
    //   writeConcern: { w: 'majority' },
    // });
    // // let allBooks =  this.bookModel.findById({userid} , {session});
    // let allBooks = await this.bookModel.find({ userid }).session(session);
    // (await session).commitTransaction();
    // return { allBooks };
  }

  // Particuar User Books
  async findAll(userid) {
    const booksData = await this.userModel.findById(userid).populate('books');
    return booksData;
  }

  async findOne(id: number) {
    const ParticularBook = await this.bookModel.findById({ _id: id });
    return ParticularBook;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
