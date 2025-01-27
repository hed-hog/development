import { IsNumber } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  item_id: number;
}
