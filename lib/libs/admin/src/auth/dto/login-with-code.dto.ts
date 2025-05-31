import { IsJWT, IsString, Matches } from 'class-validator';

export class LoginWithCodeDTO {
  @IsString({ message: 'O código deve ser uma string' })
  @IsString({ message: 'O código deve ser uma string' })
  @Matches(/^\d{6}$/, { message: 'O código deve conter 6 dígitos numéricos' })
  code: string;

  @IsJWT({ message: 'Token inválido' })
  token: string;
}
