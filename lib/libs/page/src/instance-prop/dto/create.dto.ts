import { IsNumber, IsString } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  prop_id: number;

  @IsNumber()
  instance_id: number;

  @IsString()
  value: string;
}
