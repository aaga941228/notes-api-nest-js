import { CreateNoteDTO } from './dto/notes.dto';
import { NotesService } from './notes.service';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  Body,
  Param,
  NotFoundException,
  HttpStatus,
  Query,
} from '@nestjs/common';

@Controller('notes')
export class NotesController {
  constructor(private noteService: NotesService) {}

  @Get('/')
  async getNotes(@Res() res) {
    const notes = await this.noteService.getNotes();
    return res.status(HttpStatus.OK).json(notes);
  }

  @Get('/:noteID')
  async getNote(@Res() res, @Param('noteID') noteID) {
    const note = await this.noteService.getNote(noteID);
    if (!note) {
      throw new NotFoundException('note doesn´t exist');
    }
    return res.status(HttpStatus.OK).json(note);
  }

  @Post('/create')
  async CreateNote(@Res() res, @Body() createNoteDTO: CreateNoteDTO) {
    const note = await this.noteService.CreateNote(createNoteDTO);
    return res.status(HttpStatus.OK).json(note);
  }

  @Delete('/delete')
  async DeleteNote(@Res() res, @Query('noteID') noteID) {
    const deletedNote = await this.noteService.deleteNote(noteID);
    if (!deletedNote) {
      throw new NotFoundException('note doesn´t exist');
    }
    return res.status(HttpStatus.OK).json({ message: 'note deleted' });
  }

  @Put('/update/:noteID')
  async UpdateNote(
    @Res() res,
    @Body() createNoteDTO: CreateNoteDTO,
    @Param('noteID') noteID,
  ) {
    const updateNote = await this.noteService.updateNote(noteID, createNoteDTO);
    if (!updateNote) {
      throw new NotFoundException('note doesn´t exist');
    }
    return res.status(HttpStatus.OK).json({ message: 'note updated' });
  }
}
