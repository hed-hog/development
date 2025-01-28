import { IsNumber, IsString } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  type_id: number;

  @IsNumber()
  component_id: number;

  @IsString()
  name: string;

  @IsString()
  default: string;
}
