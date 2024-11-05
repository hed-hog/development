import { IsInt, IsBoolean, IsString, IsOptional } from 'class-validator';

export class UpdatePersonAddressDTO {
  @IsOptional()
  @IsInt({ message: 'TypeID must be an integer number.' })
  type_id: number;

  @IsOptional()
  @IsBoolean({ message: 'Primary must be a boolean.' })
  primary?: boolean = false;

  @IsOptional()
  @IsString({ message: 'Street must be a string.' })
  street?: string;

  @IsOptional()
  @IsInt({ message: 'Number must be a number.' })
  number?: number;

  @IsOptional()
  @IsString({ message: 'Complement must be a string.' })
  complement?: string;

  @IsOptional()
  @IsString({ message: 'District must be a string.' })
  district?: string;

  @IsOptional()
  @IsString({ message: 'City must be a string.' })
  city?: string;

  @IsOptional()
  @IsString({ message: 'State must be a string.' })
  state?: string;

  @IsOptional()
  @IsString({ message: 'Postal Code must be a string.' })
  postal_code?: string;

  @IsOptional()
  @IsString({ message: 'Reference must be a string.' })
  reference?: string;

  @IsOptional()
  @IsInt({ message: 'CountryID must be a number.' })
  country_id?: number;
}
