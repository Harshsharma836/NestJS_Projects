import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  title: string;
  caption: string;
  imagePath: string;
  email: string;
  likes: [];
  comments: [];
}
