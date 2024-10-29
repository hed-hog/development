import { IsEmail } from 'class-validator';

export class ForgetDTO {
  @IsEmail()
  email: string;
}
