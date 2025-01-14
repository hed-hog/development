import { IsNumber } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  capital: number;

  @IsNumber()
  coins_count: number;
}
