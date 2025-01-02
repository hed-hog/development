import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class CreateDTO {
  @IsString({ message: 'O nome deve ser uma string' })
  name: string;

  @IsEmail({}, { message: 'O email deve ser um email válido' })
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
        'A senha deve ter pelo menos 6 caracteres, contendo pelo menos uma letra minúscula',
    },
  )
  password: string;
}
