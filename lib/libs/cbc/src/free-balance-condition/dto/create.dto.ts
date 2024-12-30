import { IsNumber } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  capital: number;

  @IsNumber()
  initial_margin: number;

  @IsNumber()
  final_margin: number;
}
