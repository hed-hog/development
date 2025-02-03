import {
  IsEmail,
  IsNumberString,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class PixDTO {
  @IsString()
  identificationType: string;

  @IsNumberString()
  @MinLength(11)
  @MaxLength(14)
  identificationNumber: string;

  @IsString()
  name: string;

  @IsString()
  paymentSlug: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsNumberString()
  phone: string;
}
