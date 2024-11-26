import {
  IsInt,
  IsBoolean,
  IsString,
  Length,
  IsOptional,
} from 'class-validator';

export class CreateDTO {
  @IsInt()
  person_id: number;

  @IsInt()
  country_id: number;

  @IsInt()
  type_id: number;

  @IsBoolean()
  primary: boolean;

  @IsString()
  @Length(0, 255)
  street: string;

  @IsString()
  @Length(0, 15)
  @IsOptional()
  number?: string;

  @IsString()
  @Length(0, 255)
  @IsOptional()
  complement?: string;

  @IsString()
  @Length(0, 255)
  district: string;

  @IsString()
  @Length(0, 255)
  city: string;

  @IsString()
  @Length(0, 255)
  state: string;

  @IsString()
  @Length(0, 20)
  postal_code: string;

  @IsString()
  @Length(0, 60)
  @IsOptional()
  reference?: string;
}
