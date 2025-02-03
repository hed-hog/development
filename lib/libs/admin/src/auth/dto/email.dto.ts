import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class EmailDTO {
  @IsNotEmpty()
  @IsEmail()
  currentEmail: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsEmail()
  newEmail: string;
}
