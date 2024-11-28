import { IsNumber } from 'class-validator';
import { IsBoolean } from 'class-validator';
import { IsString } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  person_id: number;

  @IsNumber()
  country_id: number;

  @IsNumber()
  type_id: number;

  @IsBoolean()
  primary: boolean;

  @IsString()
  street: string;

  @IsString()
  number: string;

  @IsString()
  complement: string;

  @IsString()
  district: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  postal_code: string;

  @IsString()
  reference: string;
}
