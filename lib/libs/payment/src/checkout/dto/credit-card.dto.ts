import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNumberString,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreditCardDTO {
  @IsString()
  token: string;

  @IsString()
  paymentMethodId: string;

  @IsEnum(['credit', 'debit'])
  paymentMethodType: 'credit' | 'debit';

  @IsInt()
  installments: number;

  @IsString()
  identificationType: string;

  @IsNumberString()
  @MinLength(11)
  @MaxLength(14)
  identificationNumber: string;

  @IsString()
  paymentSlug: string;

  @IsInt()
  issuerId: number;

  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  phone: string;
}
