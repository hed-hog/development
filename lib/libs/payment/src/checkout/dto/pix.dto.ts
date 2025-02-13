import {
  IsEmail,
  IsNumberString,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class PixDTO {
  @IsString({ message: 'O tipo de documento deve ser texto' })
  identificationType: string;

  @IsNumberString(
    {},
    { message: 'O número de documento deve ser composto por números' },
  )
  @MinLength(11, {
    message: 'O número de documento deve ter ao menos 11 caracteres',
  })
  @MaxLength(14, {
    message: 'O número de documento deve ter no máximo 14 caracteres',
  })
  identificationNumber: string;

  @IsString({ message: 'O nome deve ser texto' })
  name: string;

  @IsString({ message: 'O slug do pagamento deve ser texto' })
  paymentSlug: string;

  @IsString({ message: 'O e-mail deve ser texto' })
  @IsEmail({}, { message: 'O e-mail deve ser um e-mail válido' })
  email: string;

  @IsNumberString({}, { message: 'O telefone deve ser composto por números' })
  phone: string;
}
