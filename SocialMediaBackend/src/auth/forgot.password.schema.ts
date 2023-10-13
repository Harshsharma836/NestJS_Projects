import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { now ,Document, SchemaTypes } from 'mongoose';

@Schema()
export class ForgotPassword {
  @Prop()
  email : String

  @Prop()
  otp : number
  
  @Prop()
  otpExpireTime : number

  @Prop({default : now()})
  createdAt : Date

}
export const ForgotPasswordSchema = SchemaFactory.createForClass(ForgotPassword);
