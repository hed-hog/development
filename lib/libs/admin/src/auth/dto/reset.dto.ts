import { IsNotEmpty, MinLength } from 'class-validator';

export class ResetDTO {
  @IsNotEmpty({ message: 'Por favor, preencha a nova senha.' })
  @MinLength(8, { message: 'A nova senha deve ter pelo menos 8 caracteres.' })
  newPassword: string;

  @IsNotEmpty({ message: 'Por favor, confirme a nova senha.' })
  @MinLength(8, {
    message: 'A confirmação da senha deve ter pelo menos 8 caracteres.',
  })
  confirmNewPassword: string;

  @IsNotEmpty({ message: 'Por favor, informe o código.' })
  code: string;
}
