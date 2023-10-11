export class CreatePostDto {
  title: string;
  description: string;
  likes: number[];
  comments: [{ text: string; status: string }];
}
