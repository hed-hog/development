import { IsNumber, IsString } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  leverage: number;

  @IsNumber()
  percentage: number;

  @IsNumber()
  mmr_percentage: number;

  @IsNumber()
  addtiononal_margin: number;

  @IsString()
  mmr: string;
}
