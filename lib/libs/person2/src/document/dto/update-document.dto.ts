import {
  IsInt,
  IsBoolean,
  IsString,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class UpdatePersonDocumentDTO {
  @IsOptional()
  @IsInt()
  type_id?: number;

  @IsOptional()
  @IsBoolean()
  primary?: boolean = false;

  @IsOptional()
  @IsString()
  value?: string;

  @IsOptional()
  @IsInt()
  country_id?: number;

  @IsOptional()
  @IsDateString()
  issued_at?: Date;

  @IsOptional()
  @IsDateString()
  expiry_at?: Date;
}
