import { IsString } from 'class-validator';
import { IsNumber } from 'class-validator';

export class CreateDTO {
  @IsString()
  name: string;

  @IsNumber()
  photo_id: number;

  @IsNumber()
  type_id: number;

  @IsString()
  birth_at: string;
}
