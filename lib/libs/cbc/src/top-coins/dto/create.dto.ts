import { IsString, IsNumber } from 'class-validator';

export class CreateDTO {
  @IsString()
  name: string;

  @IsString()
  symbol: string;

  @IsNumber()
  price: number;

  @IsNumber()
  percent_change_24h: number;
}
