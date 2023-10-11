import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { User } from 'src/auth/user.schema';

@Schema()
export class Friends {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  friendId: User;

  // Common relationship
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  userId: User;

  @Prop()
  friendName: string;

  @Prop()
  isClosedFriend: boolean;
}
export const FriendsSchema = SchemaFactory.createForClass(Friends);
