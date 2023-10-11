import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

import { Document, SchemaTypes } from 'mongoose';
import { Friends } from 'src/friends/friends.schema';
import { Posts } from 'src/posts/post.schema';

export type UserDocument = Document & User;
@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  isActive: boolean;

  @Prop()
  Address: string;

  @Prop()
  HighestEducation: string;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Posts' }] })
  posts: Posts[]; // Reference to the Post schema

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Friends' }] })
  friends: Friends[];
}
export const UserSchema = SchemaFactory.createForClass(User);
