import { IsString } from 'class-validator';

export class CreateDTO {
  @IsString({ message: 'O slug deve ser um texto' })
  slug: string;

  @IsString({ message: 'O nome deve ser um texto' })
  name: string;
}
