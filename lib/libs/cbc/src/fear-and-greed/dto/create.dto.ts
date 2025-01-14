import { IsNumber, IsString } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  value: number;

  @IsString()
  value_classification: string;
}
