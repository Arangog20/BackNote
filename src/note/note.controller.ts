import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Delete, 
  NotAcceptableException, 
  BadRequestException, 
  Put 
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post('/create-note')
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.noteService.create(createNoteDto);
  }

  @Get('/all-notes')
  async findAll() : Promise<Note[]> {
    const notes = await this.noteService.findAll();

    if (notes.length===0){
      throw new NotAcceptableException(`No notes found`);
    }
    return notes;
  }

  @Get(':_id')
  async findOne(@Param('_id') _id: string) {
    const findNote = await this.noteService.findOne(_id);
    if (!findNote){
      throw new BadRequestException(`Note not found with id: ${_id} or invalid format`);
    }
    return findNote;
  } 

  @Put(':_id')
  update(@Param('_id') _id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.noteService.update(_id, updateNoteDto);
  }

  @Delete('/delete/:_id')
  async remove(@Param('_id') _id: string) {
    await this.noteService.remove(_id);
    if (!this.noteService.findOne(_id)){
      throw new BadRequestException(`Note not found with id: ${_id}`);
    }
    return { message: `Note with id: ${_id} has been deleted` };
  
  }
}
