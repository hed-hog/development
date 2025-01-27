import { IsNumber, IsOptional } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  payment_method_id: number;

  @IsNumber()
  item_id: number;

  @IsNumber()
  discount_type_id: number;

  @IsOptional()
  @IsNumber()
  value?: number;
}
