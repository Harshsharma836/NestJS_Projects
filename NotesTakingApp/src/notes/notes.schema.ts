import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type postDocument = HydratedDocument<Notes>;

@Schema()
export class Notes {
  @Prop()
  title: string;

  @Prop()
  subject: string;

  @Prop()
  description: string;

  @Prop()
  createdBy: string;
}
export const NoteSchema = SchemaFactory.createForClass(Notes);
