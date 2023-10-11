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
}

export const BookSchema = SchemaFactory.createForClass(Book);
