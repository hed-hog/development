import { IsBoolean, IsString, Length, IsInt } from 'class-validator';

export class CreateDTO {
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

  @IsInt()
  country_id: number;
}
