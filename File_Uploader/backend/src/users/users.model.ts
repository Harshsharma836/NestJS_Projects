import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { File } from 'src/file/Schema/file.schema';
import { SchemaTypes } from 'mongoose';

@Schema()
export class FileUser {
  @Prop()
  fullName : string;
  
  @Prop()
  username: string; // Its for Email

  @Prop()
  password: string;

  //  files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'File' }] })
  files: File[];
}

export const FileUsersSchema = SchemaFactory.createForClass(FileUser);
