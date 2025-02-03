import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class ChangeDTO {
  @IsNotEmpty()
  @MinLength(8)
  newPassword: string;

  @IsNotEmpty()
  @MinLength(8)
  confirmNewPassword: string;

  @IsNotEmpty()
  @MinLength(8)
  currentPassword: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
