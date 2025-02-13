import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

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
}
