import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Query,
  Param,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createBookDto: CreateBookDto, @Req() req) {
    const userId = req.user.userid;
    return this.booksService.create(createBookDto, userId);
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

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Req() req) {
    const userid = req.user.userid;
    return this.booksService.findAll(userid);
  }

  // Testing Purpose

  @Post('transaction')
  @UseGuards(AuthGuard)
  transactionStart(@Req() req) {
    return this.booksService.transcation(req.user.userid);
  }
}
