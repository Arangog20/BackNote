import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note } from './entities/note.entity';

@Injectable()
export class NoteService {

  constructor(@InjectModel(Note.name) private noteModel: Model<Note>){}

  async create(createNoteDto: CreateNoteDto) {
    const existingNote = await this.noteModel
    .findOne({ _id: createNoteDto._id })
    .exec();
    if (existingNote) {
      throw new HttpException (
        ` Note with id ${createNoteDto._id} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

     const CreateNote = new this.noteModel(CreateNoteDto);
    return CreateNote.save();
  }

  async findAll(): Promise<Note[]>  {
    const existingNotes = await this.noteModel.find().exec()
    if (!existingNotes) {
      throw new HttpException('No notes found', HttpStatus.NOT_FOUND);
    }
    return  existingNotes;
  }

  async findOne(_id: string): Promise<Note>{
    const Note = await this.noteModel.findById(_id).exec();
    if (!Note) {
      throw new HttpException(`Note with id ${_id} not found`, HttpStatus.NOT_FOUND);
    }
    return Note;
  }

  async update(_id: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const UpdateNote = await this.noteModel
    .findByIdAndUpdate(_id, updateNoteDto, { new: true })
    .exec();
    if (!UpdateNote) {
      throw new HttpException(`Note with id ${_id} not found`, HttpStatus.NOT_FOUND);
    }
    return UpdateNote;
  }

  async remove(_id: string): Promise<void> {
    
    const note = await this.noteModel.findByIdAndDelete(  _id).exec(); 
    if (!note) {
      throw new HttpException(`Note with id ${_id} not found`, HttpStatus.NOT_FOUND);
    }
  }
}
