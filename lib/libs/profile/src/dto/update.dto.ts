import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class AddressDTO {
  @IsString()
  street: string;

  @IsString()
  number: string;

  @IsString()
  district: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  @Length(8, 9, { message: 'Postal code must be between 8 and 9 characters' })
  postal_code: string;

  @IsString()
  @IsOptional()
  complement?: string;

  @IsInt()
  @IsOptional()
  country_id?: number;

  @IsString()
  @IsOptional()
  reference?: string;

  @IsBoolean()
  @IsOptional()
  primary?: boolean;
}

export class UpdateUserDataDTO {
  @IsString()
  name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsOptional()
  @IsString()
  @Length(10, 15, { message: 'Telephone must be between 10 and 15 characters' })
  telephone?: string;

  @IsOptional()
  address?: AddressDTO;
}
