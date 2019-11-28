import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Note } from './interfaces/notes.interface';
import { CreateNoteDTO } from './dto/notes.dto';

@Injectable()
export class NotesService {
  constructor(@InjectModel('Note') private noteModel: Model<Note>) {}

  async getNotes(): Promise<Note[]> {
    const notes = await this.noteModel.find();
    return notes;
  }

  async getNote(noteId: string): Promise<Note> {
    if (!Types.ObjectId.isValid(noteId)) {
      return;
    }
    const note = await this.noteModel.findById(noteId);
    return note;
  }

  async CreateNote(createNoteDTO: CreateNoteDTO): Promise<Note> {
    const note = new this.noteModel(createNoteDTO);
    return await note.save();
  }

  async deleteNote(noteID: string): Promise<Note> {
    if (!Types.ObjectId.isValid(noteId)) {
      return;
    }
    const deletedNote = await this.noteModel.findByIdAndDelete(noteID);
    return deletedNote;
  }

  async updateNote(
    noteID: string,
    createNoteDTO: CreateNoteDTO,
  ): Promise<Note> {
    if (!Types.ObjectId.isValid(noteId)) {
      return;
    }
    const updatedNote = await this.noteModel.findByIdAndUpdate(
      noteID,
      createNoteDTO,
      { new: true },
    );
    return updatedNote;
  }
}
