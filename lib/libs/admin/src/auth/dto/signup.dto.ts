import { LoginDTO } from './login.dto';

export class SignupDTO extends LoginDTO {
  fullName: string;
  cpf: number;
}
