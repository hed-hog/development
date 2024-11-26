import {
  IsInt,
  IsBoolean,
  IsString,
  Length,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateDTO {
  @IsInt()
  person_id: number;

  @IsInt()
  type_id: number;

  @IsInt()
  country_id: number;

  @IsBoolean()
  primary: boolean;

  @IsString()
  @Length(0, 63)
  value: string;

  @IsDateString()
  @IsOptional()
  issued_at?: string;

  @IsDateString()
  @IsOptional()
  expiry_at?: string;
}
