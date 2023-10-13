import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './book.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/Schema/user.schema';
import { TransactionService } from './transcation.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private bookModel = Model<Book>,
    @InjectModel(User.name) private userModel = Model<User>,
    private transactionService: TransactionService,
  ) {}

  // Its a Sample of Transcation in db
  async transcation(_id) {
    const session = await this.transactionService.startTransaction();
    try {
      // Perform operations here
      const result = await this.bookModel.find();
      if (_id != undefined) {
        const anothereQuery = await this.bookModel.findById(_id);
      }
      // Commit the transaction if everything is good
      await this.transactionService.commitTransaction(session);
      //return result;
      console.log('Transaction successful:', {
        timestamp: new Date(),
      });
      return result;
    } catch (error) {
      // for errorr
      console.log('error');
      await this.transactionService.abortTransaction(session);
      throw error;
    }
  }

  async create(createBookDto: CreateBookDto, userid) {
    createBookDto['userid'] = userid;
    const book = await this.bookModel.create(createBookDto);
    await this.userModel.findByIdAndUpdate(
      { _id: userid },
      { $push: { books: book._id } },
    );
    const ans = await this.bookModel
      .findById({ _id: userid })
      .populate('books');
    return 'Book Added';
  }

  // Count Book
  async countUserBook(userid) {
    const counts = await this.bookModel.count({ userid });
    return counts;
  }

  async findBook(title) {
    const bookByTittle = await this.bookModel.find({ title: { $in: title } });
    return bookByTittle;
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
  async startTranscation() {
    return await this.bookModel.db.startSession();
  }

  // Particuar User Books
  async getUserBooks(userid) {
    const userBook = await this.userModel.findById(userid).populate('books');
    return userBook;
  }

  // Get all books
  async getAllBooks() {
    const allBooks = await this.bookModel.find();
    return allBooks;
  }

  async findOne(id: number) {
    const ParticularBook = await this.bookModel.findById({ _id: id });
    return ParticularBook;
  }

  async update(_id: number, updateBookDto: UpdateBookDto) {
    console.log({ _id }, { updateBookDto });
    const update = await this.bookModel.findByIdAndUpdate(_id, updateBookDto, {
      new: true,
    });
    const data = await console.log('Updated Successfully');
    return update;
  }

  async delete(_id) {
    await this.bookModel.findByIdAndDelete(_id);
    return 'Book Deleted';
  }
}
