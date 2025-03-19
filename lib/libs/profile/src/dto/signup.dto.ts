import { IsNumber, IsOptional, IsString } from 'class-validator';
import { LoginDTO } from './login.dto';

export class SignupDTO extends LoginDTO {
  @IsString({ message: 'O nome completo deve ser informado.' })
  fullName: string;

  @IsString({ message: 'O CPF deve ser informado.' })
  cpf: string;

  @IsOptional()
  @IsString({ message: 'O endereço deve ser informado.' })
  street: string;

  @IsOptional()
  @IsString({ message: 'O número deve ser informado.' })
  number?: string;

  @IsOptional()
  @IsString({ message: 'O complemento deve ser informado.' })
  complement?: string;

  @IsOptional()
  @IsString({ message: 'O bairro deve ser informado.' })
  district: string;

  @IsOptional()
  @IsString({ message: 'A cidade deve ser informada.' })
  city: string;

  @IsOptional()
  @IsString({ message: 'O estado deve ser informado.' })
  state: string;

  @IsOptional()
  @IsString({ message: 'O CEP deve ser informado.' })
  postal_code: string;

  @IsOptional()
  @IsNumber({}, { message: 'O telefone deve ser informado.' })
  telephone: number;
}
