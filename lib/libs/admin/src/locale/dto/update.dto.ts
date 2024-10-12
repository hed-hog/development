import {
  IsString,
  IsInt,
  IsOptional,
  Length,
  IsDate,
  IsDecimal,
  IsBoolean,
} from 'class-validator';

export class UpdateDTO {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  code?: string;

  @IsString()
  @IsOptional()
  region?: string;

  @IsInt()
  @IsOptional()
  country_id?: number;
}
