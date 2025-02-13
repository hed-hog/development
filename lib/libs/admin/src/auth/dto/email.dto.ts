import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class EmailDTO {
  @IsNotEmpty({ message: 'O e-mail atual é obrigatório.' })
  @IsEmail({}, { message: 'O e-mail atual informado não é válido.' })
  currentEmail: string;

  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres.' })
  password: string;

  @IsNotEmpty({ message: 'O novo e-mail é obrigatório.' })
  @IsEmail({}, { message: 'O novo e-mail informado não é válido.' })
  newEmail: string;
}
