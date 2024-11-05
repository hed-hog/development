import { IsString, Length } from 'class-validator';

export class CreateDTO {
  @IsString()
  @Length(0, 255)
  title: string;

  @IsString()
  content: string;
}
