import { IsNumber, IsString } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  person_id: number;

  @IsString()
  role: string;
}
