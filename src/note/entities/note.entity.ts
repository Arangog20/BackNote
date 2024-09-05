import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class Note extends Document {
    
    @Prop ({required: true, type: String})
    title: string;

    @Prop ({required: true, type: String})
    description: string;

    @Prop ({required: true, type: Date})
    createdAt : Date;

    @Prop ({required: true, type: Date})
    updatedAt : Date;
}

export const NoteSchema =
SchemaFactory.createForClass(Note);
