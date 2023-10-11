import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type postDocument = HydratedDocument<Posts>;

@Schema()
export class Posts {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  email: string;

  @Prop()
  likes: number[];

  @Prop()
  comments: [{ email : string , text: string; status: string }];
}
export const PostSchema = SchemaFactory.createForClass(Posts);
