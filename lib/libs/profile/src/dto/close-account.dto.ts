import { IsStrongPassword } from 'class-validator';

export class CloseAccountDTO {
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 0,
    minNumbers: 0,
    minSymbols: 0,
  })
  password: string;
}
