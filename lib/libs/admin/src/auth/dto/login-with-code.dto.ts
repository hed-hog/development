import { IsInt, IsJWT, Max, Min } from 'class-validator';

export class LoginWithCodeDTO {
  @Min(0, { message: 'O código deve ser pelo menos 0.' })
  @Max(999999, { message: 'O código deve ser no máximo 999999.' })
  @IsInt({ message: 'O código deve ser um número inteiro.' })
  code: number;

  @IsJWT({ message: 'Token inválido' })
  token: string;
}
