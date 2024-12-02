import { IsNumber } from 'class-validator';
import { IsBoolean } from 'class-validator';
import { IsString } from 'class-validator';
import { IsOptional } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  country_id: number;

  @IsNumber()
  type_id: number;

  @IsBoolean()
  primary: boolean;

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
