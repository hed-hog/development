import { IsNumber } from 'class-validator';
import { IsBoolean } from 'class-validator';
import { IsString } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  person_id: number;

  @IsNumber()
  type_id: number;

  @IsNumber()
  country_id: number;

  @IsBoolean()
  primary: boolean;

  @IsString()
  value: string;

  @IsString()
  issued_at: string;

  @IsString()
  expiry_at: string;
}
