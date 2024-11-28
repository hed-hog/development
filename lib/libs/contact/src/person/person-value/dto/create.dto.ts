import { IsNumber } from 'class-validator';
import { IsString } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  person_id: number;

  @IsString()
  value: string;
}
