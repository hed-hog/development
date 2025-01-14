import { IsNumber } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  leverage: number;

  @IsNumber()
  percentage: number;

  @IsNumber()
  mmr_percentage: number;

  @IsNumber()
  additional_margin: number;
}
