import { IsNumber } from 'class-validator';
import { IsBoolean } from 'class-validator';
import { IsString } from 'class-validator';
import { IsOptional } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  type_id: number;

  @IsNumber()
  country_id: number;

  @IsOptional()
  @IsBoolean()
  primary?: boolean;

  @IsString()
  value: string;

  @IsOptional()
  @IsString()
  issued_at?: string;

  @IsOptional()
  @IsString()
  expiry_at?: string;
}
