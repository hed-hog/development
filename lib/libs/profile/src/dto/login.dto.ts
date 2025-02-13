import { IsEmail, IsStrongPassword } from 'class-validator';

export class LoginDTO {
  @IsEmail({}, { message: 'O e-mail informado não é válido.' })
  email: string;

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
}
