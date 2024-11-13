import { IsInt, IsBoolean, IsString, Length } from 'class-validator';

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
  number: string;

  @IsString()
  @Length(0, 255)
  complement: string;

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
  reference: string;
}
