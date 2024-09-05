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

  findAll() {
    return `This action returns all note`;
  }

  findOne(id: number) {
    return `This action returns a #${id} note`;
  }

  update(id: number, updateNoteDto: UpdateNoteDto) {
    return `This action updates a #${id} note`;
  }

  remove(id: number) {
    return `This action removes a #${id} note`;
  }
}
