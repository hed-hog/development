import { IsNumber, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  discount_type_id: number;

  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  value: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @IsNumber()
  uses_limit?: number;

  @IsOptional()
  @IsNumber()
  uses_qtd?: number;

  @IsString()
  starts_at: string;

  @IsOptional()
  @IsString()
  ends_at?: string;
}
