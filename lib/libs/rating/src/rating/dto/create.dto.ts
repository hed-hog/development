import { IsString, IsNumber } from 'class-validator';

export class CreateDTO {
  @IsString()
  comment: string;

  @IsNumber()
  note: number;

  @IsNumber()
  person_id: number;
}
