import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class FileUser {
  @Prop()
  username: string;

  @Prop()
  password: string;
}

export const FileUsersSchema = SchemaFactory.createForClass(FileUser);
