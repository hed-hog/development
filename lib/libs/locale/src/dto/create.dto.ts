import {
  IsString,
  IsInt,
  IsOptional,
  Length,
  IsDate,
  IsDecimal,
  IsBoolean,
} from 'class-validator';

export class CreateDTO {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsString()
  region: string;

  @IsInt()
  country_id: number;
}
