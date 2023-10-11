import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum } from 'class-validator';
import { Role } from './dto/role.enum';

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @IsEnum(Role) // Ensure the provided role is a valid enum value
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
