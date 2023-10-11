import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Author, AuthorSchema } from './author.schema';

@Module({
  imports: [ MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema}]) ],
  controllers: [AuthorsController],
  providers: [AuthorsService],
})
export class AuthorsModule {}
