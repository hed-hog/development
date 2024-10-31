import {
  IsInt,
  IsOptional,
  IsDecimal,
  IsString,
  IsDate,
  Length,
} from 'class-validator';

export class UpdateDTO {
  @IsInt()
  @IsOptional()
  status_id?: number;

  @IsInt()
  @IsOptional()
  gateway_id?: number;

  @IsInt()
  @IsOptional()
  person_id?: number;

  @IsDecimal()
  @IsOptional()
  amount?: number;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsDate()
  @IsOptional()
  paid_at?: Date;

  @IsString()
  @Length(0, 255)
  @IsOptional()
  transaction_id?: string;
}
