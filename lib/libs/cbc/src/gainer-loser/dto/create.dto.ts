import { IsNumber } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  coin_id: number;

  @IsNumber()
  type_id: number;

  @IsNumber()
  percent_change_24h: number;

  @IsNumber()
  price: number;
}
