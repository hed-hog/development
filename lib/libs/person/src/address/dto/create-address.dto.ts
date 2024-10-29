import { IsInt, IsBoolean, IsString, IsOptional } from 'class-validator';

export class CreatePersonAddressDTO {
  @IsInt({ message: 'TypeID must be an integer number.' })
  type_id: number;

  @IsBoolean({ message: 'Primary must be a boolean.' })
  primary = false;

  @IsString({ message: 'Street must be a string.' })
  street: string;

  @IsInt({ message: 'Number must be a number.' })
  number?: number;

  @IsString({ message: 'Complement must be a string.' })
  complement?: string;

  @IsString({ message: 'District must be a string.' })
  district: string;

  @IsString({ message: 'City must be a string.' })
  city: string;

  @IsString({ message: 'State must be a string.' })
  state: string;

  @IsString({ message: 'Postal Code must be a string.' })
  postal_code: string;

  @IsString({ message: 'Reference must be a string.' })
  reference?: string;

  @IsOptional()
  @IsInt({ message: 'CountryID must be a number.' })
  country_id?: number;
}
