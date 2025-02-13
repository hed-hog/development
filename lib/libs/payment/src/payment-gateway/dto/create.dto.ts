import { IsString } from 'class-validator';

export class CreateDTO {
  @IsString({ message: 'O slug é obrigatório e deve ser um texto.' })
  slug: string;

  @IsString({ message: 'O nome é obrigatório e deve ser um texto.' })
  name: string;
}
