import { Injectable } from '@nestjs/common';
import { ClientSession, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './book.schema';

@Injectable()
export class TransactionService {
  private session: ClientSession;
  constructor(@InjectModel(Book.name) private bookModel = Model<Book>) {}

  async startTransaction(): Promise<any> {
    console.log('Transcation Started');
    this.session = await this.bookModel.db.startSession();
    this.session.startTransaction();
    return this.session;
  }

  async commitTransaction(session): Promise<void> {
    await session.commitTransaction();
    session.endSession();
  }

  async abortTransaction(session): Promise<void> {
    await session.abortTransaction();
    session.endSession();
  }
}
