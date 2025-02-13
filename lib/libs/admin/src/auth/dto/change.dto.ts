import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class ChangeDTO {
  @IsNotEmpty({
    message: 'Precisa preencher a nova senha',
  })
  @MinLength(8, {
    message: 'A senha deve ter pelo menos 8 caracteres',
  })
  newPassword: string;

  @IsNotEmpty({
    message: 'Precisa confirmar a nova senha',
  })
  @MinLength(8)
  confirmNewPassword: string;

  @IsNotEmpty({
    message: 'Precisa preencher a senha atual',
  })
  @MinLength(8, {
    message: 'A senha atual deve ter pelo menos 8 caracteres',
  })
  currentPassword: string;

  @IsNotEmpty({
    message: 'Precisa preencher o email',
  })
  @IsEmail(
    {},
    {
      message: 'O email informado não é válido.',
    },
  )
  email: string;
}
