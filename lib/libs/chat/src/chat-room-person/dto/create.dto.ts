import { IsNumber, IsString } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  chat_id: number;

  @IsNumber()
  person_id: number;

  @IsString()
  role: string;
}
