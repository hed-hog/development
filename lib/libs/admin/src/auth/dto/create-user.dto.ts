import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsStrongPassword(
    {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 0,
      minNumbers: 0,
      minSymbols: 0,
    },
    {
      message:
        'A senha deve ter pelo menos 6 caracteres e conter pelo menos 1 letra minúscula.',
    },
  )
  password: string;

  @IsString({ message: 'O endereço deve ser informado.' })
  street: string;

  @IsOptional()
  @IsString({ message: 'O número deve ser informado.' })
  number?: string;

  @IsOptional()
  @IsString({ message: 'O complemento deve ser informado.' })
  complement?: string;

  @IsString({ message: 'O bairro deve ser informado.' })
  district: string;

  @IsString({ message: 'A cidade deve ser informada.' })
  city: string;

  @IsString({ message: 'O estado deve ser informado.' })
  state: string;

  @IsString({ message: 'O CEP deve ser informado.' })
  postal_code: string;
}
