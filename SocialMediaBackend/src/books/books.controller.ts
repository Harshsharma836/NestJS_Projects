import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Query,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { title } from 'process';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createBookDto: CreateBookDto, @Req() req) {
    const userId = req.user.userid;
    return this.booksService.create(createBookDto, userId);
  }

  @Get()
  @UseGuards(AuthGuard)
  getAllBooks() {
    return this.booksService.getAllBooks();
  }

  @Get('findbook')
  @UseGuards(AuthGuard)
  async findBook(@Query('title') title: string) {
    const book = await this.booksService.findBook(title);
    return book;
  }

  @Get('totalbooks')
  @UseGuards(AuthGuard)
  countUserBook(@Req() req) {
    const userid = req.user.userid;
    return this.booksService.countUserBook(userid);
  }

  // Get all book price or by title
  @Get('allbprice')
  @UseGuards(AuthGuard)
  TotalBooksPrice(@Req() req, @Query() parmas) {
    return this.booksService.TotalBooksPrice(parmas.title);
  }

  @Get('user')
  @UseGuards(AuthGuard)
  getUserBooks(@Req() req) {
    const userid = req.user.userid;
    return this.booksService.getUserBooks(userid);
  }

  @Patch(':bookid')
  @UseGuards(AuthGuard)
  updateBook(
    @Param('bookid') bookid: number,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.booksService.update(bookid, updateBookDto);
  }

  @Delete(':bookid')
  @UseGuards(AuthGuard)
  deleteBook(@Param('bookid') bookid: number) {
    return this.booksService.delete(bookid);
  }

  // Testing Purpose
  @Post('transaction:bookid')
  @UseGuards(AuthGuard)
  transactionStart(@Req() req, @Param('bookid') bookid: number) {
    return this.booksService.transcation(bookid);
  }
}
