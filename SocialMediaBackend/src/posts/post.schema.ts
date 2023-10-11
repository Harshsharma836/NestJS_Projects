import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
  comments: [{ By: string; Comment: string }];
}
export const PostSchema = SchemaFactory.createForClass(Posts);
