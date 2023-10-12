import { Date } from 'mongoose';

export class CreatePostDto {
  title: string;
  caption: string;
  email: string;
  scheduleDateAndTime: any;
}
