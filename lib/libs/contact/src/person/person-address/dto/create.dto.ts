import { IsNumber, IsBoolean, IsString, IsOptional } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  country_id: number;

  @IsNumber()
  type_id: number;

  @IsOptional()
  @IsBoolean()
  primary?: boolean;

  @IsString()
  street: string;

  @IsOptional()
  @IsString()
  number?: string;

  @IsOptional()
  @IsString()
  complement?: string;

  @IsString()
  district: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  postal_code: string;

  @IsOptional()
  @IsString()
  reference?: string;
}
