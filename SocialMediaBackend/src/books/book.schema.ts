import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Book {
  @Prop()
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userid: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop({ required: true, index: true })
  book_id: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
BookSchema.index({ type: 1 }, { unique: true });
