import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
  Req,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Roles } from 'src/auth/dto/role.decorator';
import { Role } from 'src/auth/dto/role.enum';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/role.guard';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  // Post Notes.
  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User)
  create(@Body() createNoteDto: CreateNoteDto, @Req() req) {
    const email = req.user.sub;
    return this.notesService.create(createNoteDto, email);
  }
  
  // Get All Notes of User or By title
  @Get()
  @Roles(Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  findUserNotes(@Query('title') title, @Req() req) {
    const userEmail = req.user.sub;
    return this.notesService.findUserNotes(title, req.user.role, userEmail);
  }

  @Get(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User)
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Req() req,
  ) {
    const userEmail = req.user.sub;
    return this.notesService.findOne(id, userEmail);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User)
  update(
    @Param('id') id: number,
    @Body() updateNoteDto: UpdateNoteDto,
    @Req() req,
  ) {
    const email = req.user.sub;
    return this.notesService.update(id, updateNoteDto, email, req.user.role);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param('id') id: number, @Req() req) {
    const email = req.user.sub;
    return this.notesService.remove(id, email, req.user.role);
  }
}
