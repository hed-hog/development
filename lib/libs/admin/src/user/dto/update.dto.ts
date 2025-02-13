import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class UpdateDTO {
  @IsString({ message: 'O nome deve ser uma string' })
  @IsOptional()
  name?: string;

  @IsEmail({}, { message: 'O email deve ser um email válido' })
  @IsOptional()
  email?: string;

  @IsOptional()
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
        'A senha deve ter pelo menos 6 caracteres e conter pelo menos 1 letra minúscula',
    },
  )
  password?: string;

  @IsOptional()
  @IsInt({ message: 'O ID do multifator deve ser um número' })
  multifactor_id?: number;

  @IsOptional()
  @IsString({ message: 'O código deve ser uma string' })
  code?: string;
}
