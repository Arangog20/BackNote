import { 
    IsDate,
    IsEmpty, 
    IsNotEmpty, 
    IsString 
} from "class-validator";

export class CreateNoteDto {

    @IsNotEmpty()
    @IsString()
    _id: string;

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
