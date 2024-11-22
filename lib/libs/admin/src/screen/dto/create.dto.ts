import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDTO {
  @IsString({ message: 'O slug deve ser uma string' })
  @IsNotEmpty({ message: 'O slug é obrigatório.' })
  slug: string;

  @IsString({ message: 'O ícone deve ser uma string' })
  @IsNotEmpty({ message: 'A descrição é obrigatória.' })
  icon?: string;
}
