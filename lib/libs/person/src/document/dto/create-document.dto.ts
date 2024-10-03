import {
  IsInt,
  IsBoolean,
  IsString,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreatePersonDocumentDTO {
  @IsInt({ message: 'TypeID must be an integer number. ' })
  type_id: number;

  @IsBoolean({ message: 'Primary must be a boolean. ' })
  primary: boolean = false;

  @IsString({ message: 'Value must be a string. ' })
  value: string;

  @IsOptional()
  @IsInt({ message: 'CountryID must be a number.' })
  country_id?: number;

  @IsOptional()
  @IsDateString()
  issued_at?: Date;

  @IsOptional()
  @IsDateString()
  expiry_at?: Date;
}
