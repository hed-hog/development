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
  @IsString({ message: 'O token deve ser uma string' })
  token: string;

  @IsString({ message: 'O ID do método de pagamento deve ser uma string' })
  paymentMethodId: string;

  @IsEnum(['credit', 'debit'], {
    message: 'O tipo de método de pagamento deve ser "credit" ou "debit"',
  })
  paymentMethodType: 'credit' | 'debit';

  @IsInt({ message: 'O número de parcelas deve ser um número inteiro' })
  installments: number;

  @IsString({
    message: 'O tipo de documento de identificação deve ser uma string',
  })
  identificationType: string;

  @IsNumberString(
    {},
    {
      message:
        'O número de documento de identificação deve ser um número com 11 a 14 caracteres',
    },
  )
  @MinLength(11, {
    message:
      'O número de documento de identificação deve ter ao menos 11 caracteres',
  })
  @MaxLength(14, {
    message:
      'O número de documento de identificação deve ter no máximo 14 caracteres',
  })
  identificationNumber: string;

  @IsString({ message: 'O slug do pagamento deve ser uma string' })
  paymentSlug: string;

  @IsInt({ message: 'O ID do emissor deve ser um número inteiro' })
  issuerId: number;

  @IsString({ message: 'O nome do titular deve ser uma string' })
  name: string;

  @IsString({ message: 'O e-mail do titular deve ser uma string' })
  @IsEmail({}, { message: 'O e-mail do titular deve ser um e-mail válido' })
  email: string;

  @IsString({ message: 'O telefone do titular deve ser uma string' })
  phone: string;
}
