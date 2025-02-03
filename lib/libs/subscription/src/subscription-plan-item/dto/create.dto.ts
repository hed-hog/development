import { IsNumber } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  plan_id: number;

  @IsNumber()
  item_id: number;
}
