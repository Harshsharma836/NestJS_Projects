import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, QueryTimestampsConfig, now } from 'mongoose';

@Schema()
export class Posts {
  @Prop()
  title: string;

  @Prop()
  caption: string;

  @Prop()
  imagePath: string;

  // This is for Relation Ship.
  @Prop({ type: String, ref: 'User' })
  email: string;

  @Prop()
  likes: number[];

  @Prop()
  isActive: boolean;

  @Prop({ type: Date })
  createdAt: Date;

  // Format is : oct 12, 2023 11:29:00
  @Prop()
  scheduleDateAndTime: number;

  @Prop()
  comments: [{ By: string; Comment: string }];
}
export const PostSchema = SchemaFactory.createForClass(Posts);
