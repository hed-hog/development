import { IsNumber } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  value: number;

  @IsNumber()
  value_24h_percentage_change: number;
}
