import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class AddressDTO {
  @IsString({ message: 'Informe o logradouro' })
  street: string;

  @IsString({ message: 'Informe o número' })
  number: string;

  @IsString({ message: 'Informe o bairro' })
  district: string;

  @IsString({ message: 'Informe a cidade' })
  city: string;

  @IsString({ message: 'Informe o estado' })
  state: string;

  @IsString({ message: 'Informe o CEP com 8 ou 9 caracteres' })
  @Length(8, 9, { message: 'Informe o CEP com 8 ou 9 caracteres' })
  postal_code: string;

  @IsString({ message: 'Informe o complemento' })
  @IsOptional()
  complement?: string;

  @IsInt({ message: 'Informe o país' })
  @IsOptional()
  country_id?: number;

  @IsString({ message: 'Informe a referência' })
  @IsOptional()
  reference?: string;

  @IsBoolean({ message: 'Informe se o endereço é principal' })
  @IsOptional()
  primary?: boolean;
}

export class UpdateUserDataDTO {
  @IsString({ message: 'Informe seu nome completo' })
  name: string;

  @IsEmail({}, { message: 'Informe um e-mail válido' })
  email: string;

  @IsOptional()
  @IsString({ message: 'Informe o telefone com 10 ou 15 caracteres' })
  @Length(10, 15, { message: 'Informe o telefone com 10 ou 15 caracteres' })
  telephone?: string;

  @IsOptional()
  address?: AddressDTO;
}
