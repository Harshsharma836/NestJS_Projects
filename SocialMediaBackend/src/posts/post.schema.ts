import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { QueryTimestampsConfig, now } from 'mongoose';

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

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: new Date().toLocaleTimeString() })
  createdAtTime: string;

  @Prop()
  scheduleTime: string;

  @Prop()
  comments: [{ By: string; Comment: string }];
}
export const PostSchema = SchemaFactory.createForClass(Posts);
