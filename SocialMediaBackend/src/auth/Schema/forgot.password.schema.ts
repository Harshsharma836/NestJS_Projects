import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { now } from 'mongoose';

@Schema()
export class ForgotPassword {
  @Prop()
  email: string;

  @Prop()
  otp: number;

  @Prop()
  otpExpireTime: number;

  @Prop({ default: now() })
  createdAt: Date;
}
export const ForgotPasswordSchema =
  SchemaFactory.createForClass(ForgotPassword);
