import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgetDTO {
  @IsEmail({}, { message: 'O e-mail informado não é válido.' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
  email: string;
}
