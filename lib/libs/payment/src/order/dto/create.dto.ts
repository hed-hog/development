import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateDTO {
  @IsString()
  slug: string;

  @IsNumber()
  person_id: number;

  @IsNumber()
  gateway_id: number;

  @IsNumber()
  total: number;

  @IsNumber()
  status_id: number;

  @IsString()
  document: string;

  @IsOptional()
  @IsString()
  payment_at?: string;
}
