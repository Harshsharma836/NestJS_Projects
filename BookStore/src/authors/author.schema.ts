import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

import { Document, SchemaTypes } from 'mongoose';
import { Books } from 'src/books/book.schema';
@Schema()
export class Author {
  @Prop()
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Books' }] })
  posts: Books[]; // Reference to the Post schema
}
export const AuthorSchema = SchemaFactory.createForClass(Author);
