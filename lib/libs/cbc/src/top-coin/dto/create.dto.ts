import { IsNumber } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  coin_id: number;

  @IsNumber()
  type_id: number;

  @IsNumber()
  order: number;
}
