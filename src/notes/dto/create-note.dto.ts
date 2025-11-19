import { IsString, MinLength } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  title: string;

  @IsString()
  @MinLength(1)
  content: string;
}
