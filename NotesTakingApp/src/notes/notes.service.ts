import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Notes } from './notes.schema';
import { Model } from 'mongoose';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Notes.name) private notesModel: Model<Notes>) {}

  async create(createNoteDto: CreateNoteDto, email) {
    const createdPost = await new this.notesModel({
      ...createNoteDto,
      createdBy: email,
    });
    return createdPost.save();
  }

  // Find User Notes Or All notes based on Role
  async findUserNotes(title, role: string, email) {
    const NotesData = await this.notesModel.find({
      ...(role === 'user' && { createdBy: email }),
    });
    if (title === undefined) {
      return NotesData;
    } else {
      const NoteBasedOnTitle = NotesData.filter((item) => item.title === title);
      return NoteBasedOnTitle;
    }
  }

  // Find User Notes by Id.
  async findOne(id: number, email) {
    const Notes = await this.notesModel.find({ createdBy: email });
    const NoteById = Notes.filter((val) => {
      if (val.id === id) return val;
    });
    return NoteById;
  }

  // User can updates only its personal notes.
  // Admin can update any notes.
  async update(
    id: number,
    updateNoteDto: UpdateNoteDto,
    email: string,
    role: string,
  ) {
    if (role === 'user') {
      const checkNoteEmail = await this.notesModel.findById(id);
      if (email != checkNoteEmail.createdBy) {
        return "You Don't have a right to Update this Note as it does't belongs to You";
      }
    }
    // If it is Admin or The user has rights
    const updatedNote = await this.notesModel.findByIdAndUpdate(
      id,
      { ...updateNoteDto, updatedBy: email },
      { new: true },
    );
    return updatedNote;
  }

  async remove(id: number, email: string, role) {
    const checkNoteEmail = await this.notesModel.findById(id);
    if (!checkNoteEmail) return "Note did't find by this Id";

    if (role === 'user') {
      // If role is user
      if (email != checkNoteEmail.createdBy) {
        return "You Don't have a right to Delete this Note as it does't belongs to You";
      }
      await this.notesModel.findByIdAndRemove(id);
      return `This action removes a #${id} note`;
    } else {
      // If role is admin
      await this.notesModel.findByIdAndRemove(id);
      return `This action removes a #${id} note`;
    }
  }
}
