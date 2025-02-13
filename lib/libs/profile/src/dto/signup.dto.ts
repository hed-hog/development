import { IsNumber, IsOptional, IsString } from 'class-validator';
import { LoginDTO } from './login.dto';

export class SignupDTO extends LoginDTO {
  @IsString({ message: 'O nome completo deve ser informado.' })
  fullName: string;

  @IsString({ message: 'O CPF deve ser informado.' })
  cpf: string;

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

  @IsNumber({}, { message: 'O telefone deve ser informado.' })
  telephone: number;
}
