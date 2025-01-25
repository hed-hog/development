import { IsNumber, IsOptional } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  payment_id: number;

  @IsNumber()
  item_id: number;

  @IsOptional()
  @IsNumber()
  unit_price?: number;

  @IsOptional()
  @IsNumber()
  delivered?: number;

  @IsOptional()
  @IsNumber()
  quantity?: number;
}
