import { 
    IsDate,
    IsEmpty, 
    IsString 
} from "class-validator";

export class CreateNoteDto {

    @IsEmpty()
    @IsString()
    _id  : string;

    @IsEmpty()
    @IsString()
    title: string;

    @IsEmpty()
    @IsString()
    description: string;

    @IsEmpty()
    @IsDate()
    createdAt : Date;

    @IsEmpty()
    @IsDate()
    updatedAt : Date;
}
