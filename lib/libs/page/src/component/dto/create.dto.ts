import { IsNumber, IsString } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  type_id: number;

  @IsString()
  name: string;
}
