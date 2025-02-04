import { IsNumber, IsOptional, IsString } from 'class-validator';
import { LoginDTO } from './login.dto';

export class SignupDTO extends LoginDTO {
  @IsString()
  fullName: string;

  @IsNumber()
  cpf: number;

  @IsString()
  street: string;

  @IsOptional()
  @IsString()
  number?: string;

  @IsOptional()
  @IsString()
  complement?: string;

  @IsString()
  district: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  postal_code: string;

  @IsNumber()
  telephone: number;
}
