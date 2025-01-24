import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateDTO {
  @IsString()
  slug: string;

  @IsNumber()
  person_id: number;

  @IsNumber()
  gateway_id: number;

  @IsNumber()
  amount: number;

  @IsNumber()
  status_id: number;

  @IsString()
  document: string;

  @IsOptional()
  @IsString()
  payment_at?: string;

  @IsString()
  currency: string;

  @IsNumber()
  method_id: number;

  @IsOptional()
  @IsNumber()
  brand_id?: number;

  @IsOptional()
  @IsNumber()
  installments?: number;

  @IsOptional()
  @IsNumber()
  delivered?: number;
}
