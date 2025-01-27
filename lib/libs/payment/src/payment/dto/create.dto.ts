import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateDTO {
  @IsString()
  slug: string;

  @IsOptional()
  @IsNumber()
  person_id?: number;

  @IsNumber()
  gateway_id: number;

  @IsNumber()
  amount: number;

  @IsNumber()
  status_id: number;

  @IsOptional()
  @IsString()
  document?: string;

  @IsOptional()
  @IsString()
  payment_at?: string;

  @IsString()
  currency: string;

  @IsOptional()
  @IsNumber()
  method_id?: number;

  @IsOptional()
  @IsNumber()
  brand_id?: number;

  @IsOptional()
  @IsNumber()
  installments?: number;

  @IsOptional()
  @IsNumber()
  delivered?: number;

  @IsOptional()
  @IsNumber()
  coupon_id?: number;

  @IsOptional()
  @IsNumber()
  discount?: number;
}
